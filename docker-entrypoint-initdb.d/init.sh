#!/bin/bash
echo "⏳ Restoring MongoDB dump..."
mongorestore --db SBD_Kelas /init-dump
echo "✅ Restore complete"