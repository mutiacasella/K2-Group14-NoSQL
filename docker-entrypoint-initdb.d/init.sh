#!/bin/bash
echo "Restoring MongoDB dump..."

if [ -d "/init-dump" ]; then
    echo "Folder /init-dump found. Listing contents:"
    ls /init-dump
    mongorestore --db SBD_Kelas /init-dump
else
    echo "Directory /init-dump not found inside container!"
fi

echo "Restore complete"