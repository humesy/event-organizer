Run from command line: node events.java

Event data is stored in the data.json file to be read by events.js.
This file currently has the data set provided at the end of part 2, but
can be updated in the same format for further testing.

The program reads all events from the one data file and divides them based on
the type attribute of each.

Assumptions:
- Events will not start and end on different days (can incorporate this if desired)
- Events with the same time will be considered to be overlapping. e.g an available event
  starting at 5:00pm will overlap with an event ending at 5:00pm