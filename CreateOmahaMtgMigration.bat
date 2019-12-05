echo off
set migrationName=%1

dotnet ef migrations add --project .\src\OmahaMTG\ --startup-project .\src\OmahaMTG.Site\ --context UserGroupContext --output-dir Infrastructure\Data\Migrations %migrationName% -v 