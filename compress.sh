#!/usr/bin/env bash
logfile='compress.log'
[ -e ${logfile} ] || touch ${logfile};

arr=($(rsync -rnv --ignore-existing --exclude=*.txt --exclude-from=${logfile} queue/ processed/ | grep -v '^building file list' | grep -v '^sending incremental file list' | grep -v '^sent' | grep -v '^total'))
#echo ${#arr[@]}
step=10
total=${#arr[@]}
echo ${total}

touch .lock
#echo "" > ${logfile}
for (( i=0; i<total; i+=step )); do
    if [ -f .lock ]; then
        batch=""
        for (( j=0; j<step; j++ )); do
            batch="${batch} ${arr[i+j]}"
#            echo ${arr[i+j]} >> ${logfile}
        done

        echo ""
        echo "#### starting batch ${i} / ${total} ####"
        echo "batch: ${batch}"
        echo ""

        gulp image --batch="${batch}"

        for (( j=0; j<step; j++ )); do
            echo ${arr[i+j]} >> ${logfile}
        done
    else
        echo "lock not found exiting"
        exit 1
    fi
done

rm .lock