step=50000
for i in {0..10100000..50000}
do
  echo "start: $i"
  echo "end: $(( $i + $step ))"
  node seed-couch.js $i $(( $i + $step )) &
done
