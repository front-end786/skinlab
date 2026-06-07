#!/bin/bash
set -e

echo "Installing Python dependencies..."
uv sync --frozen

echo "Waiting for PostgreSQL..."
retries=0
max_retries=30
while ! uv run python -c "
import socket, os
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((os.environ['DBHOST'], int(os.environ['DBPORT'])))
s.close()
" 2>/dev/null; do
    retries=$((retries + 1))
    if [ "$retries" -ge "$max_retries" ]; then
        echo "ERROR: Could not connect to PostgreSQL after $max_retries attempts."
        exit 1
    fi
    echo "  PostgreSQL not ready yet (attempt $retries/$max_retries)..."
    sleep 1
done
echo "PostgreSQL is ready."

echo "Running migrations..."
uv run python manage.py migrate --noinput

echo "Creating default admin user (if needed)..."
uv run python manage.py create_default_admin

echo "Collecting static files..."
uv run python manage.py collectstatic --noinput

echo "Starting development server..."
exec uv run python manage.py runserver 0.0.0.0:8000
