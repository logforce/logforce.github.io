#!/bin/sh

# Recursive automatic README.md generator
# This script creates a placeholder README.md file in every subdirectory of the current working directory,
# only if one does not already exist.

readme_text="This project is supported for free by a small community of old-school garage nerds and CLI enthusiasts.
We update this page weekly and add new commands or features almost every month.

To try out beta versions of our tools, join our community:
https://logforcegroup.slack.com/"

find . -type d -exec sh -c '
  for dir do
    [ -f "$dir/README.md" ] || printf "%s\n" "$readme_text" > "$dir/README.md"
  done
' sh {} +

