# Chapter 14


Configuring Layer 2 Data Center Interconnect

This section contains an example of how to configure a Layer 2 Data Center Interconnect (DCI) with the use
of a Virtual Port-Channel (vPC).

• Data Center Interconnect (concept), on page 425
• Example of Layer 2 Data Center Interconnect, on page 426

Data Center Interconnect (concept)

Data Center Interconnect (DCI) is a set of networking technologies and methodologies that

• link two or more distinct data center facilities over any distance,

• extend specific VLANs and provide Layer 2 adjacency for servers and Network Attached Storage (NAS)

devices.

Cisco Nexus 9000 series switches support DCI with FHRP isolation. However DCI with FHRP isolation is
not supported on Cisco Nexus 9500 switches with N9K-X9636C-R and N9K-X9636Q-R line cards. Creating
a single logical link between multiple sites with vPC allows you to take advantage of the benefits of STP
isolation using BPDU filtering across the DCI vPC port-channel. With this configuration, Bridge Protocol
Data Unit (BPDU) does not cross between data centers, effectively isolating the STP fault domain between
sites.

Note

vPC is to interconnect a maximum of two data centers.

DCI Support on Nexus switches

Note

The supported platforms include Cisco Nexus 9500 Series switches with N9K-X9636C-R, N9K-X9636Q-R,
N9K-X9636C-RX line cards.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

425

Example of Layer 2 Data Center Interconnect

Configuring Layer 2 Data Center Interconnect

Example of Layer 2 Data Center Interconnect

The following is an example configuration of a Layer 2 Data Center Interconnect (DCI) with use of vPC. The
example allows for First Hop Redundancy Protocol (FHRP) isolation.

Note

vPC and Hot Standby Routing Protocol (HSRP) have already been configured.

Note

Link Aggregation Control Protocol (LACP) should be used on the vPC link, which acts as the DCI.

Figure38:DualLayer2/Layer3PODInterconnect

In this example, the Layer 3 (L3) gateway is configured on the same vPC pair and acts as the DCI. In order
to isolate the Hot Standby Routing Protocol (HSRP), you must configure a Port Access Control List (PACL)
on the DCI port-channel and disable HSRP Gratuitous Address Resolution Protocols (ARPs) (GARPs) on the
Switched Virtual Interfaces (SVIs) for the VLANs that move across the DCI.

ip access-list DENY_HSRP_IP

10 deny udp any 224.0.0.2/32 eq 1985
20 deny udp any 224.0.0.102/32 eq 1985
30 permit ip any any

interface <DCI-Port-Channel>

ip port access-group DENY_HSRP_IP in

interface Vlan <x>

no ip arp gratuitous hsrp duplicate

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

426

