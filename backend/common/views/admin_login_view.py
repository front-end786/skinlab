from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from common.models import Profile
from common.serializer import OrgAwareRefreshToken


class EmailPasswordLoginView(APIView):
    """Staff email/password login for the CRM admin frontend."""

    permission_classes = []
    authentication_classes = []

    def post(self, request):
        email = (request.data.get("email") or "").strip().lower()
        password = request.data.get("password") or ""

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"error": "User account is disabled"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if not user.is_staff:
            return Response(
                {"error": "Staff access required for CRM admin"},
                status=status.HTTP_403_FORBIDDEN,
            )

        profiles = Profile.objects.filter(user=user, is_active=True).select_related("org")
        organizations = [
            {"id": str(p.org_id), "name": p.org.name, "role": p.role}
            for p in profiles
        ]

        org = profiles[0].org if profiles else None
        profile = profiles[0] if profiles else None
        token = OrgAwareRefreshToken.for_user_and_org(user, org, profile)

        return Response(
            {
                "access_token": str(token.access_token),
                "refresh_token": str(token),
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "name": user.name or user.email.split("@")[0],
                },
                "organizations": organizations,
            }
        )
