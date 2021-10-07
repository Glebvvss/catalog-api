#!/usr/bin/env bash

/bin/cat /myapp/mysql/backup.sql | \
	/usr/bin/mysql -u user -p \
		--comments \
		catalog
