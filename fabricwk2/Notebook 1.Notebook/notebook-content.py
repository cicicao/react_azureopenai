# Fabric notebook source

# METADATA ********************

# META {
# META   "kernel_info": {
# META     "name": "synapse_pyspark"
# META   },
# META   "dependencies": {
# META     "lakehouse": {
# META       "default_lakehouse": "a66b2bec-9d02-412d-a6f1-babe1c41bc83",
# META       "default_lakehouse_name": "lakehouse1",
# META       "default_lakehouse_workspace_id": "01e9de5b-026b-4ff4-918c-4f1371febbe0",
# META       "known_lakehouses": [
# META         {
# META           "id": "a66b2bec-9d02-412d-a6f1-babe1c41bc83"
# META         }
# META       ]
# META     }
# META   }
# META }

# CELL ********************

1

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }

# CELL ********************

from notebookutils import mssparkutils

src_path = "Files/testfile/tf1"
# dest_path = "Files/testfile/d1"
dest_path = "abfss://container1@2510150040000408sto.dfs.core.windows.net/d1/tf1"

# 执行复制操作
mssparkutils.fs.cp(src_path, dest_path,recurse=True)

# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }

# CELL ********************


# METADATA ********************

# META {
# META   "language": "python",
# META   "language_group": "synapse_pyspark"
# META }
