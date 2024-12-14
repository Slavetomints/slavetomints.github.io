# Listing Scans

So you want to to scan a network to look for alive hosts, but you want to make sure that you remain in scope. Thankfully Nmap has a nifty tool for that.

So lets say your scope is limited to `192.168.0.0/24`, and you want to be sure you only scan things on that subnet. But you cant just hope and pray that your command will be correct on the first go, that will look unprofessional. So you need to validate what you'll be scanning on the network. For that lets use the `-sL` flag.

## ---sL 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIxODI4MjE1MCwtMTQ1OTc5MzI2MywtND
AxODkyMTc2LC0xNTQxNTMyNjA5XX0=
-->