# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Telemetry
1) install wsl and docker 
https://learn.microsoft.com/en-us/windows/wsl/setup/environment 
https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode

2) run program 
    -  learning how to run docker as it doesnt seem to work - https://www.youtube.com/watch?v=gAkwW2tuIqE 
    - randomly started working after writing a random nonsensical command ("he") which outputted an installer 
    - stopped working again as attempt to update deleted the whole thing
    - reinstalled and working now (don't touch)

3) Initial troubleshoot of website
    - unable to connect with server (on port 8080)
    - through docker I can see that this is the streaming service server.ts 
    - copy error code connect ECONNREFUSED and websearch https://stackoverflow.com/questions/14168433/node-js-error-connect-econnrefused 
    - implement answer and test (works)
    - take out answer and test (doesn't work)
    - therefore right solution
- am assuming for now this was task #1

4) A closer look at the data being sent
    - every 2 to 20 lines have a crazy battery temperature (eg 932 or 6) - identified by integer
        - I know that i can't edit the data sent but will investigate
        - appears to be built in 
    - a SyntaxError also shows up: Unexpected token } in JSON at position 66
        - appears to be built in 

5) Working on task #2
    - first confirmed console.log works as expected by outputting "testing"
    - then confirmed what json data is by just outputting it 
    - my approach is to use timestamp value already on it to mesure how long (ie to check 5sec) and use a revolving array of objects to store the out of bound values within 5 sec
    - simple implementation using push and shift however OutOfBound[0] is not always defined by virtue of the method and thus neither is its .timestamp
        - will attempt to fix by catching the error (because i know its not actually an error)
        - feels very janky to do it this way would prefer there to be no error
        - fixed by ensuring the timestamp is only updated when there is at least an element in array (ie when an element is added) 
    - I'm assuming I dont need to send it to the ui but will revisit

6) Moving onto task #3
    - for some reason vscode hates react and marks all as errors but everything still works 
    - locate definition of the temp value through f12
    - just used if else for it

7) Making it pretty / a bit better?
    - commented out the console.log from both backend and frontend (console.log is soooo slow)
    - honestly the design is fine it's a battery temperature gauge 
    - changing the tab title and icon to better reflect redback -https://noaheakin.medium.com/changing-the-default-react-browser-tab-title-and-icon-1240239d92d3, https://convertio.co/jpg-ico/ 
         - I may revisit this with https://www.geeksforgeeks.org/how-to-change-the-favicon-in-react-js/ but preliminary testing isn't great
    - added a bit of a background to make the value easier to read
    
8) Going back to task #2
    - I dont think we need multiple alerts for the 3 out of bounds so slight change to get rid of the oldest one when that is outputted
    - Added colour to better differentiate these alerts


## Cloud