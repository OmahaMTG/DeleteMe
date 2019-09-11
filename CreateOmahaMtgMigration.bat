echo off
set migrationName=%1

dotnet ef migrations add --project .\src\OmahaMTG\ --startup-project .\src\OmahaMTG.Api\ --context UserGroupContext %migrationName%