# Database initialization script
$env:PGPASSWORD = 'admin'

# Create database
psql -U postgres -c "CREATE DATABASE IF NOT EXISTS itunes_project"

# Run schema setup
psql -U postgres -d itunes_project -f "$PSScriptRoot\database-setup.sql"

Write-Host "Database setup completed successfully" -ForegroundColor Green
