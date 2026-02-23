# Chapter 7


Configuring Port Channels

• About Port Channels, on page 197
• Port Channels, on page 198
• Port-Channel Interfaces, on page 199
• Basic Settings, on page 199
• Compatibility Requirements, on page 200
• Load Balancing Using Port Channels, on page 202
• Symmetric Hashing, on page 203
• Guidelines and Limitations for ECMP, on page 203
• Resilient Hashing, on page 204
• GTP Tunnel Load Balancing, on page 204
• LACP, on page 206
• Prerequisites for Port Channeling, on page 212
• Guidelines and Limitations, on page 212
• Default Settings, on page 216
• Configuring Port Channels, on page 216

About Port Channels

A port channel is an aggregation of multiple physical interfaces that creates a logical interface. You can bundle
up to 32 individual active links into a port channel to provide increased bandwidth and redundancy. Port
channeling also load balances traffic across these physical interfaces. The port channel stays operational as
long as at least one physical interface within the port channel is operational.

You can create a Layer 2 port channel by bundling compatible Layer 2 interfaces, or you can create Layer 3
port channels by bundling compatible Layer 3 interfaces. You cannot combine Layer 2 and Layer 3 interfaces
in the same port channel.

You can also change the port channel from Layer 3 to Layer 2. See the Configuring Layer 2 Interfaces chapter
for information about creating Layer 2 interfaces.

A Layer 2 port channel interface and it's member ports can have different STP parameters. Changing the STP
parameters of the port channel does not impact the STP parameters of the member ports because a port channel
interface takes precedence if the member ports are bundled.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

197

Port Channels

Configuring Port Channels

Note

After a Layer 2 port becomes part of a port channel, all switchport configurations must be done on the port
channel; you can no longer apply switchport configurations to individual port-channel members. You cannot
apply Layer 3 configurations to an individual port-channel member either; you must apply the configuration
to the entire port channel.

In releases prior to Cisco NX-OS Release 9.3(7), in a port-channel configuration with a member port operating
as an individual (I), you can define the STP port-type under the member port rather than the port-channel.

Beginning with Cisco NX-OS Release 9.3(7), in a port-channel configuration with a member port operating
as an individual (I), you can no longer define the STP port-type under the member port. It remains blocked
by the STP. You must configure the STP port-type under the port-channel.

You can use static port channels, with no associated aggregation protocol, for a simplified configuration.

For more flexibility, you can use the Link Aggregation Control Protocol (LACP), which is defined in IEEE
802.3ad. When you use LACP, the link passes protocol packets. You cannot configure LACP on shared
interfaces.

See the LACP Overview section for information about LACP.

Port Channels

A port channel bundles physical links into a channel group to create a single logical link that provides the
aggregate bandwidth of up to 32 physical links. If a member port within a port channel fails, the traffic
previously carried over the failed link switches to the remaining member ports within the port channel.

However, you can enable the LACP to use port channels more flexibly. Configuring port channels with LACP
and static port channels require a slightly different procedure (see the “Configuring Port Channels” section).

Note

The device does not support Port Aggregation Protocol (PAgP) for port channels.

Each port can be in only one port channel. All the ports in a port channel must be compatible; they must use
the same speed and duplex mode (see the “Compatibility Requirements” section). When you run static port
channels with no aggregation protocol, the physical links are all in the on channel mode; you cannot change
this mode without enabling LACP (see the “Port-Channel Modes” section).

You can create port channels directly by creating the port-channel interface, or you can create a channel group
that acts to aggregate individual ports into a bundle. When you associate an interface with a channel group,
the software creates a matching port channel automatically if the port channel does not already exist. In this
instance, the port channel assumes the Layer 2 or Layer 3 configuration of the first interface. You can also
create the port channel first. In this instance, the Cisco NX-OS software creates an empty channel group with
the same channel number as the port channel and takes the default Layer 2 or Layer 3 configuration, as well
as the compatibility configuration (see the “Compatibility Requirements” section).

Note

The port channel is operationally up when at least one of the member ports is up and that port’s status is
channeling. The port channel is operationally down when all member ports are operationally down.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

198

Configuring Port Channels

Port-Channel Interfaces

Port-Channel Interfaces

The following shows port-channel interfaces.

Figure9:Port-ChannelInterfaces

You can classify port-channel interfaces as Layer 2 or Layer 3 interfaces. In addition, you can configure Layer
2 port channels in either access or trunk mode. Layer 3 port-channel interfaces have routed ports as channel
members.

You can configure a Layer 3 port channel with a static MAC address. If you do not configure this value, the
Layer 3 port channel uses the router MAC of the first channel member to come up. See the Cisco Nexus 9000
Series NX-OS Layer 2 Switching Configuration Guide for information about configuring static MAC addresses
on Layer 3 port channels.

See the "Configuring Layer 2 Interfaces" chapter for information about configuring Layer 2 ports in access
or trunk mode and the "Configuring Layer 3 Interfaces" chapter for information about configuring Layer 3
interfaces and subinterfaces.

Basic Settings

You can configure the following basic settings for the port-channel interface:

• Bandwidth—Use this setting for informational purposes only; this setting is to be used by higher-level

protocols.

• Delay—Use this setting for informational purposes only; this setting is to be used by higher-level protocols.

• Description

• Duplex

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

199

Compatibility Requirements

Configuring Port Channels

• IP addresses

• Maximum Transmission Unit (MTU)

• Shutdown

• Speed

Compatibility Requirements

When you add an interface to a channel group, the software checks certain interface attributes to ensure that
the interface is compatible with the channel group. For example, you cannot add a Layer 3 interface to a Layer
2 channel group. The Cisco NX-OS software also checks a number of operational attributes for an interface
before allowing that interface to participate in the port-channel aggregation.

The compatibility check includes the following operational attributes:

• Network layer

• (Link) speed capability

• Speed configuration

• Duplex capability

• Duplex configuration

• Port mode

• Access VLAN

• Trunk native VLAN

• Tagged or untagged

• Allowed VLAN list

• MTU size

• SPAN—Cannot be a SPAN source or a destination port

• Storm control

• Flow-control capability

• Flow-control configuration

• Media type, either copper or fiber

Use the show port-channel compatibility-parameters command to see the full list of compatibility checks
that the Cisco NX-OS uses.

You can only add interfaces configured with the channel mode set to on to static port channels, and you can
only add interfaces configured with the channel mode as active or passive to port channels that are running
LACP. You can configure these attributes on an individual member port. If you configure a member port with
an incompatible attribute, the software suspends that port in the port channel.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

200

Configuring Port Channels

Compatibility Requirements

Alternatively, you can force ports with incompatible parameters to join the port channel if the following
parameters are the same:

• (Link) speed capability

• Speed configuration

• Duplex capability

• Duplex configuration

• Flow-control capability

• Flow-control configuration

When the interface joins a port channel, some of its individual parameters are removed and replaced with the
values on the port channel as follows:

• Bandwidth

• Delay

• Extended Authentication Protocol over UDP

• VRF

• IP address

• MAC address

• Spanning Tree Protocol

• NAC

• Service policy

• Access control lists (ACLs)

Many interface parameters remain unaffected when the interface joins or leaves a port channel as follows:

• Beacon

• Description

• CDP

• LACP port priority

• Debounce

• UDLD

• MDIX

• Rate mode

• Shutdown

• SNMP trap

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

201

Load Balancing Using Port Channels

Configuring Port Channels

Note

When you delete the port channel, the software sets all member interfaces as if they were removed from the
port channel.

See the “LACP Marker Responders” section for information about port-channel modes.

Load Balancing Using Port Channels

The Cisco NX-OS software load balances traffic across all operational interfaces in a port channel by hashing
the addresses in the frame to a numerical value that selects one of the links in the channel. Port channels
provide load balancing by default. Port-channel load balancing uses MAC addresses, IP addresses, or Layer
4 port numbers to select the link. Port-channel load balancing uses either source or destination addresses or
ports, or both source and destination addresses or ports.

You can configure the load- balancing mode to apply to all port channels that are configured on the entire
device. You can configure one load-balancing mode for the entire device. You cannot configure the
load-balancing method per port channel.

You can configure the type of load-balancing algorithm used. You can choose the load-balancing algorithm
that determines which member port to select for egress traffic by looking at the fields in the frame.

The default load-balancing mode for Layer 3 interfaces is the source and destination IP L4 ports, and the
default load-balancing mode for non-IP traffic is the source and destination MAC address. Use the port-channel
load-balance command to set the load-balancing method among the interfaces in the channel-group bundle.
The default method for Layer 2 packets is src-dst-mac. The default method for Layer 3 packets is src-dst
ip-l4port.

You can configure the device to use one of the following methods to load balance across the port channel:

• Destination MAC address

• Source MAC address

• Source and destination MAC address

• Destination IP address

• Source IP address

• Source and destination IP address

• Source TCP/UDP port number

• Destination TCP/UDP port number

• Source and destination TCP/UDP port number

• GRE inner IP headers with source, destination and source-destination

Non-IP and Layer 3 port channels both follow the configured load-balancing method, using the source,
destination, or source and destination parameters. For example, when you configure load balancing to use the
source IP address, all non-IP traffic uses the source MAC address to load balance the traffic while the Layer
3 traffic load balances the traffic using the source IP address. Similarly, when you configure the destination

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

202

Configuring Port Channels

Symmetric Hashing

MAC address as the load-balancing method, all Layer 3 traffic uses the destination IP address while the non-IP
traffic load balances using the destination MAC address.

The unicast and multicast traffic is load-balanced across port-channel links based on configured load-balancing
algorithm displayed in show port-channel load-balancing command output.

The multicast traffic uses the following methods for load balancing with port channels:

• Multicast traffic with Layer 4 information—Source IP address, source port, destination IP address,

destination port

• Multicast traffic without Layer 4 information—Source IP address, destination IP address

• Non-IP multicast traffic—Source MAC address, destination MAC address

Note

Devices that run Cisco IOS can optimize the behavior of the member ports ASICs if a failure of a single
member occurred by running the port-channel hash-distribution command. The Cisco Nexus 9000 Series
device performs this optimization by default and does not require or support this command. Cisco NX-OS
does support the customization of the load-balancing criteria on port channels through the port-channel
load-balance command for the entire device.

Symmetric Hashing

To be able to effectively monitor traffic on a port channel, it is essential that each interface connected to a
port channel receives both forward and reverse traffic flows. Normally, there is no guarantee that the forward
and reverse traffic flows will use the same physical interface. However, when you enable symmetric hashing
on the port channel, bidirectional traffic is forced to use the same physical interface and each physical interface
in the port channel is effectively mapped to a set of flows.

When symmetric hashing is enabled, the parameters used for hashing, such as the source and destination IP
address, are normalized before they are entered into the hashing algorithm. This process ensures that when
the parameters are reversed (the source on the forward traffic becomes the destination on the reverse traffic),
the hash output is the same. Therefore, the same interface is chosen.

Only the following load-balancing algorithms support symmetric hashing:

• src-dst ip

• src-dst ip-l4port

Guidelines and Limitations for ECMP

You might observe that load balancing with Layer 2/Layer 3 GW flows are not load balanced equally among
all links when the switch comes up initially after reload. There are two CLIs to change the ECMP hash
configuration in the hardware. The two CLI commands are mutually exclusive.

• Enter the port-channel load-balance [src | src-dst | dst] mac command for MAC-based only hash.

• For hash based on IP/Layer 4 ports, enter either the ip load-share or port-channel load-balance

command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

203

Resilient Hashing

Configuring Port Channels

• The port-channel load-balance command can overwrite the ip load-share command. It is better to
enter the port-channel load-balance command which helps to set both the IP and MAC parameters.

• There are no options to force the hashing algorithm based on the IP/Layer 4 port. The default MAC

configuration is always programmed as a part of the port channel configuration.

• ECMP resilient hashing is not supported for traffic flows over tunnel.

• Beginning with Cisco NX-OS Release 10.5(3)F, IP load sharing, Layer 3 ECMP Dynamic Load Balancing

along with RDMA fields such as opcode, psn, and queuepair is supported on Cisco Nexus
93C64E-SG2-Q, Cisco Nexus 9364E-SG2-O Silicon One switches.

Resilient Hashing

With the exponential increase in the number of physical links used in data centers, there is also the potential
for an increase in the number of failed physical links. In static hashing systems that are used for load balancing
flows across members of port channels or Equal Cost Multipath (ECMP) groups, each flow is hashed to a
link. If a link fails, all flows are rehashed across the remaining working links. This rehashing of flows to links
results in some packets being delivered out of order even for those flows that were not hashed to the failed
link.

This rehashing also occurs when a link is added to the port channel or Equal Cost Multipath (ECMP) group.
All flows are rehashed across the new number of links, which results in some packets being delivered out of
order.

Resilient hashing maps flows to physical ports and it is supported for both ECMP groups and port channel
interfaces.

If a physical link fails, the flows originally assigned to the failed link are redistributed uniformly among the
remaining working links. The existing flows through the working links are not rehashed and hence are not
impacted.

Resilient hashing supports IPv4 and IPv6 unicast traffic, but it does not support IPv4 multicast traffic.

Resilient hashing is supported on all the Cisco Nexus 9000 Series platforms . Beginning Cisco NX-OS Release
9.3(3), resilient hashing is supported on Cisco Nexus 92160YC-X, 92304QC, 9272Q, 9232C, 9236C, 92300YC
switches.

GTP Tunnel Load Balancing

Introduction

GPRS Tunneling Protocol (GTP) is used mainly to deliver mobile data on wireless networks via Cisco Nexus
9000 Series switches as the core router. When two routers carrying GTP traffic are connected with link
bundling, the traffic is required to be distributed evenly between all bundle members.

Different Mechanisms for GTP Load Balancing

Two different kinds of mechanisms are used to achieve GTP load balancing.

• From Cisco Nexus Release 10.5(2), the inner IP header fields source, destination IP address and IP

protocol is used to maintain load balancing.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

204

Configuring Port Channels

GTP Tunnel Load Balancing

• Prior to Cisco Nexus Release 10.5(2), the 5-tuple load balancing mechanism is used. The load balancing
mechanism takes into account the source IP, destination IP, protocol, Layer 4 resource and destination
port (if traffic is TCP or UDP) fields from the packet. In the case of GTP traffic, a limited number of
unique values for these fields restrict the equal distribution of traffic load on the tunnel.

Inner IP Header GTP Load Balancing Mechanism

Using inner IP header fields source-ip, dest-ip and ip-protocol the load-balancing is done. Symmetric
load-balancing is supported to maintain stickiness for forward and reverse traffic of same flow.

GTP inner header based hashing works for both IPv4 and IPv6 on all interfaces. The inner IP header for both
IPv4 and IPv6 uses all the 16 UDF for all cloudscale switches. Inner IP headers are used for two switch or
three switches bundling.

5-Tuple GTP Load Balancing Mechanism

In order to avoid polarization for GTP traffic in load balancing, a tunnel endpoint identifier (TEID) in the
GTP header is used instead of a UDP port number. Since the TEID is unique per tunnel, traffic can be evenly
load balanced across multiple links in the bundle.

This feature overrides the source and destination port information with the 32-bit TEID value that is present
in GTPU packets.

GTP tunnel load balancing feature adds support for:

• GTP with IPv4/IPv6 transport header on physical interface

• GTP traffic over TE tunnel

• GTPU with UDP port 2152

The ip load-sharing address source-destination gtpu command enables the GTP tunnel load balancing.

To know the egress interface for GTP traffic after load balancing, use show cef {ipv4 | ipv6} exact-route
command with TEID in place of L4 protocol source and destination port number. Use 16MSBist of TEID in
source port and 16LSBits of TEID in destination port.

The port-channel load-balance src-dst gtpu command enables GTP packets with UDP destination port
number 2152 to load balance based on the GTP TEID value. This command enables the switch to load balance
for GTP packets even if the outer five tuples (src-ip, dst-ip, ip proto, L4 sport, L4 dport) are same. Because
the hardware controls for port channel and ECMP are same, enabling either port-channel load-balance or ip
load-sharing with GTP option enables GTP TEID based load balancing.

• The port-channel load-balance src-dst gtpu command is applicable for both GTP packets, with or

without VXLAN encapsulation

• When GTP header is a part of the outer layer, the port-channel load-balance src-dst gtpu command

picks up GTP TEID from outer layer for hashing.

• When GTP header is part of inner layer, the port-channel load-balance src-dst gtpu command picks

up GTP TEID from inner layer for hashing.

You need to set the protocol field to 17 and set the value for other parameters when you use the show
port-channel load-balance forwarding-path command. An example is listed below.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

205

LACP

Configuring Port Channels

switch(config)# show port-channel load-balance forwarding-path interface port-channel 2
src-ip 1.1.1.1 dst-ip 2.2.2.2 gtpteid
0x3 protocol 17

Supported Platforms

Beginning Cisco Nexus Release 9.3(3) GTP Tunnel Load Balancing is supported on Cisco Nexus 9500
platform switches with 9700-EX and 9700-FX line cards. However, GTP Tunnel Load Balancing for IPv6
flow is supported only on Cisco Nexus 9500 platform switches with FM-E2 fabric modules. It is not supported
on Cisco Nexus 9500 platform switches with FM-E fabric modules. Because the hardware control is same
for both Port-channel and ECMP, enabling either port-channel load-balance or ip load-sharing with GTP
option enables GTP TEID based load balancing for both the cases. In multi encapsulated packets, if the GTP
header is a part of outer header, it picks up GTP TEIF from outer layer for hashing. If the GTP header is a
part of inner header, it picks up GTP TEIF from inner layer for hashing.

GTP Tunnel Load Balancing is supported on Cisco Nexus 9300-EX, 9300-FX, 9300-FX2, and 9300-GX
platform switches.

Inner IP header GTP load balancing mechanism is supported on:

• Cisco Nexus 9300-EX platform switches

• Cisco Nexus 9300-FX platform switches

• Cisco Nexus 9500 platform switches with 9700-EX and 9700-FX line cards

• Cisco Nexus 9300-EX, 9300-FX, 9300-FX2, and 9300-GX platform switches

• Cisco Nexus 9364C-H1 Switch

Note

Cisco Nexus 9364C-H1 switch can natively support inner-header based hashing for packets with GTP header
of size 8 or 12 bytes

LACP

LACP allows you to configure up to 16 interfaces into a port channel.

LACP Overview

The Link Aggregation Control Protocol (LACP) for Ethernet is defined in IEEE 802.1AX and IEEE 802.3ad.
This protocol controls how physical ports are bundled together to form one logical channel.

Note

You must enable LACP before you can use LACP. By default, LACP is disabled. See the “Enabling LACP”
section for information about enabling LACP.

The system automatically takes a checkpoint before disabling the feature, and you can roll back to this
checkpoint. See the Cisco Nexus 9000 Series NX-OS System Management Configuration Guide for information
about rollbacks and checkpoints.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

206

Configuring Port Channels

Port-Channel Modes

The following figure shows how individual links can be combined into LACP port channels and channel
groups as well as function as individual links.

Figure10:IndividualLinksCombinedintoaPortChannel

With LACP, you can bundle up to 32 interfaces in a channel group.

Note

When you delete the port channel, the software automatically deletes the associated channel group. All member
interfaces revert to their original configuration.

Note

If you downgrade a Cisco Nexus 9500 series switch that is configured to use LACP vPC convergence feature,
that runs Cisco NX-OS Release 7.0(3)I7(5) to a lower release, the configuration is removed. You must configure
the LACP vPC convergence feature again when you upgrade the switch.

You cannot disable LACP while any LACP configurations are present.

Port-Channel Modes

Individual interfaces in port channels are configured with channel modes. When you run static port channels
with no aggregation protocol, the channel mode is always set to on. After you enable LACP globally on the
device, you enable LACP for each channel by setting the channel mode for each interface to either active or
passive. You can configure channel mode for individual links in the LACP channel group when you are
adding the links to the channel group

Note

You must enable LACP globally before you can configure an interface in either the active or passive channel
mode.

The following table describes the channel modes.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

207

Port-Channel Modes

Configuring Port Channels

Table14:ChannelModesforIndividualLinksinaPortChannel

Channel Mode

passive

active

on

Description

The LACP is enabled on this port channel and the
ports are in a passive negotiating state. Ports responds
to LACP packets that it receives but does not initiate
LACP negotiation.

The LACP is enabled on this port channel and the
ports are in an active negotiating state. Ports initiate
negotiations with other ports by sending LACP
packets.

The LACP is disabled on this port channel and the
ports are in a non-negotiating state. The on state of
the port channel represents the static mode.

The port will not verify or negotiate port channel
memberships. If you attempt to change the channel
mode to active or passive before enabling LACP, the
device displays an error message. When an LACP
attempts to negotiate with an interface in the on state,
it does not receive any LACP packets and becomes
an individual link with that interface, it does not join
the LACP channel group. The on state is the default
port-channel mode

Both the passive and active modes allow LACP to negotiate between ports to determine if they can form a
port channel based on criteria such as the port speed and the trunking state.The passive mode is useful when
you do not know whether the remote system, or partner, supports LACP.

Two devices can form an LACP port channel when their ports are in different LACP modes if the modes are
compatible as in the following example:

Table15:ChannelModesCompatibility

Device 1 > Port-1

Device 2 > Port-2

Result

Active

Active

Passive

On

On

Active

Passive

Passive

Active

Passive

Can form a port channel.

Can form a port channel.

Cannot form a port channel because no ports can initiate
negotiation.

Cannot form a port channel because LACP is enabled
only on one side.

Cannot form a port channel because LACP is not
enabled.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

208

Configuring Port Channels

LACP ID Parameters

LACP ID Parameters

This section describes the LACP parameters.

LACP System Priority

Each system that runs LACP has an LACP system priority value. You can accept the default value of 32768
for this parameter, or you can configure a value between 1 and 65535. LACP uses the system priority with
the MAC address to form the system ID and also uses the system priority during negotiation with other devices.
A higher system priority value means a lower priority.

Note

The LACP system ID is the combination of the LACP system priority value and the MAC address.

LACP Port Priority

Each port that is configured to use LACP has an LACP port priority. You can accept the default value of
32768 for the LACP port priority, or you can configure a value between 1 and 65535. LACP uses the port
priority with the port number to form the port identifier.

LACP uses the port priority to decide which ports should be put in standby mode when there is a limitation
that prevents all compatible ports from aggregating and which ports should be put into active mode. A higher
port priority value means a lower priority for LACP. You can configure the port priority so that specified
ports have a lower priority for LACP and are most likely to be chosen as active links, rather than hot-standby
links.

LACP Administrative Key

LACP automatically configures an administrative key value equal to the channel-group number on each port
configured to use LACP. The administrative key defines the ability of a port to aggregate with other ports. A
port’s ability to aggregate with other ports is determined by these factors:

• Port physical characteristics, such as the data rate and the duplex capability

• Configuration restrictions that you establish

LACP Marker Responders

You can dynamically redistribute the data traffic by using port channels. This redistribution might result from
a removed or added link or a change in the load-balancing scheme. Traffic redistribution that occurs in the
middle of a traffic flow can cause misordered frames.

LACP uses the Marker Protocol to ensure that frames are not duplicated or reordered due to this redistribution.
The Marker Protocol detects when all the frames of a given traffic flow are successfully received at the remote
end. LACP sends Marker PDUs on each of the port-channel links. The remote system responds to the Marker
PDU once it receives all the frames received on this link prior to the Marker PDU. The remote system then
sends a Marker Responder. Once the Marker Responders are received by the local system on all member links
of the port channel, the local system can redistribute the frames in the traffic flow with no chance of misordering.
The software supports only Marker Responders.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

209

LACP-Enabled and Static Port Channels Differences

Configuring Port Channels

LACP-Enabled and Static Port Channels Differences

The following table summarizes the major differences between port channels with LACP enabled and static
port channels.

Table16:PortChannelswithLACPEnabledandStaticPortChannels

Configurations

Port Channels with LACP Enabled

Static Port Channels

Protocol applied

Enable globally

Channel mode of links

Can be either:

Not applicable

Can only be On

• Active

• Passive

Maximum number of links in
channel

32

32

LACP Compatibility Enhancements

When a Cisco Nexus 9000 Series device is connected to a non-Nexus peer, its graceful failover defaults may
delay the time that is taken to bring down a disabled port or cause traffic from the peer to be lost. To address
these conditions, the lacp graceful-convergence command was added.

By default, LACP sets a port to suspended state if it does not receive an LACP PDU from the peer. lacp
suspend-individual is a default configuration on Cisco Nexus 9000 series switches. This command puts the
port in suspended state if it does not receive any LACP PDUs. In some cases, although this feature helps in
preventing loops created due to misconfigurations, it can cause servers fail to boot up because they require
LACP to logically bring up the port. You can put a port into an individual state by using the no lacp
suspend-individual. Port in individual sate takes attributes of the individual port based on the port
configuration.

LACP port-channels exchange LACP PDUs for quick bundling of links when connecting a server and a switch.
However, the links go into suspended state when the PDUs are not received.

The delayed LACP feature enables one port-channel member, the delayed-LACP port, to come up first as a
member of a regular port-channel before LACP PDUs are received. After it is connected in LACP mode,
other members, the auxiliary LACP ports, are brought up. This avoids having the links becoming suspended
when PDUs are not received.

Which port in the port-channel comes up first depends on the port-priority value of the ports. A member link
in a port channel with lowest priority value, will come come up first as a LACP delayed port. Regardless of
the operational status of the links, the configured priority of a LACP port is used to select the delayed-lacp
port

Guidelines and Limitations

This feature supports Layer 2 port-channels with or without VPC running in spanning-tree port type trunk
mode. These guidelines and limitations apply to LACP:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

210

Configuring Port Channels

LACP Port-Channel Minimum Links and LACP MaxBundle

• Using no lacp suspend-individual and lacp mode delay on a same port channel is not recommended

because it can put non-lacp delayed ports in individual state. As a best practice, you must avoid combining
these two configurations.

• Not supported on Layer 3 port-channels.

• Not supported on Nexus 9000 switches on the FEX NIF fabric port-channel or FEX HIF host port-channels

LACP Port-Channel Minimum Links and LACP MaxBundle

A port channel aggregates similar ports to provide increased bandwidth in a single manageable interface.

The introduction of the minimum links and LACP MaxBundle feature further refines LACP port-channel
operation and provides increased bandwidth in one manageable interface.

The LACP port-channel minimum links feature does the following:

• Configures the minimum number of ports that must be linked up and bundled in the LACP port channel.

• Prevents the low-bandwidth LACP port channel from becoming active.

• Causes the LACP port channel to become inactive if there are few active members ports to supply the

required minimum bandwidth.

The LACP MaxBundle defines the maximum number of bundled ports allowed in a LACP port channel.

The LACP MaxBundle feature does the following:

• Defines an upper limit on the number of bundled ports in an LACP port channel.

• Allows hot-standby ports with fewer bundled ports. (For example, in an LACP port channel with five

ports, you can designate two of those ports as hot-standby ports.)

Note

The minimum links and LACP MaxBundle features only work with LACP port-channels. The switch allows
you to configure these features on non-LACP port-channels, but the features are not operational.

LACP Fast Timers

You can change the LACP timer rate to modify the duration of the LACP timeout. Use the lacp rate command
to set the rate at which LACP control packets are sent to an LACP-supported interface. You can change the
timeout rate from the default rate (30 seconds) to the fast rate (1 second). This command is supported only
on LACP-enabled interfaces. To configure the LACP fast time rate, see the “Configuring the LACP Fast
Timer Rate” section.

ISSU and ungraceful switchovers are not supported with LACP fast timers.

Virtualization Support

You must configure the member ports and other port channel-related configuration from the virtual device
context (VDC) that contains the port channel and member ports. You can use the numbers from 1 to 4096 in
each VDC to number the port channels.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

211

High Availability

Configuring Port Channels

All ports in one port channel must be in the same VDC. When you are using LACP, all possible 8 active ports
and all possible 8 standby ports must be in the same VDC.

Note

You must configure load balancing using port channels in the default VDC. See the “Load Balancing Using
Port Channels” section for more information about load balancing.

High Availability

Port channels provide high availability by load balancing traffic across multiple ports. If a physical port fails,
the port channel is still operational if there is an active member in the port channel. You can bundle ports
from different modules and create a port channel that remains operational even if a module fails because the
settings are common across the module.

Port channels support stateful and stateless restarts. A stateful restart occurs on a supervisor switchover. After
the switchover, the Cisco NX-OS software applies the runtime configuration after the switchover.

The port channel goes down if the operational ports fall below the configured minimum links number.

Note

See the Cisco Nexus 9000 Series NX-OS High Availability and Redundancy Guide for complete information
about high-availability features.

Prerequisites for Port Channeling

Port channeling has the following prerequisites:

• You must be logged onto the device.

• All ports for a single port channel must be either Layer 2 or Layer 3 ports.

• All ports for a single port channel must meet the compatibility requirements. See the “Compatibility

Requirements” section for more information about the compatibility requirements.

• You must configure load balancing from the default VDC.

Guidelines and Limitations

Port channeling has the following configuration guidelines and limitations:

• For scaled port-channel deployments on Cisco Nexus 9516 switch with Gen 1 line cards, you need to
use the port-channel scale-fanout command followed by copy run start and reload commands.

• show commands with the internal keyword are not supported.

• The LACP port-channel minimum links and maxbundle feature is not supported for host interface port

channels.

• Enable LACP before you can use that feature.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

212

Configuring Port Channels

Guidelines and Limitations

• You can configure multiple port channels on a device.

• Do not put shared and dedicated ports into the same port channel. (See the “Configuring Basic Interface

Parameters” chapter for information about shared and dedicated ports.)

• For Layer 2 port channels, ports with different STP port path costs can form a port channel if they are

compatibly configured with each other. See the “Compatibility Requirements” section for more information
about the compatibility requirements.

• When L2 ePBR is configured between the L3 port channel interface, port channel will not come up as

the LACP packet drops at the ePBR device.

• In STP, the port-channel cost is based on the aggregated bandwidth of the port members.

• After you configure a port channel, the configuration that you apply to the port channel interface affects
the port channel member ports. The configuration that you apply to the member ports affects only the
member port where you apply the configuration.

• LACP does not support half-duplex mode. Half-duplex ports in LACP port channels are put in the

suspended state.

• Do not configure ports that belong to a port channel group as private VLAN ports. While a port is part

of the private VLAN configuration, the port channel configuration becomes inactive.

• Channel member ports cannot be a source or destination SPAN port.

• Port-channels are not supported on generation 1 100G line cards (N9K-X9408PC-CFP2) or generic

expansion modules (N9K-M4PC-CFP2).

• Port-channels are supported on devices with generation 2 (and later) 100G interfaces.

• The port channel might be affected by the limitations of the Application Leaf Engine (ALE) uplink ports

on Cisco Nexus 9300 and 9500 Series devices:Limitations for ALE Uplink Ports.

• Resilient hashing (port-channel load-balancing resiliency) and VXLAN configurations are not compatible

with VTEPs using ALE uplink ports.

Note

Resilient hashing is disabled by default.

• The maximum number of subinterfaces for a satellite/FEX port is 63.

• On a Cisco Nexus 92300YC switch, the first 24 ports that are part of the same quadrant. All the ports in
the same quadrant must have same speed. Having different speed on ports in a quadrant is not supported.
Following are the first 24 ports on the Cisco Nexus 92300YC switch that share same quadrant:

• 1,4,7,10

• 2,5,8,11

• 3,6,9,12

• 13,16,19,22

• 14,17,20,23

• 15,18,21,24

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

213

Guidelines and Limitations

Configuring Port Channels

• On a Cisco Nexus 9500 switch with a X96136YC-R line card, the ports 17–48 are part of the same

quadrant. Ports in the same quadrant must have same speed (1/10G or 25G) on all ports. Having different
speed on ports in a quadrant is not supported. If you set different speed in any of the ports in a quadrant,
the ports go into error disable state. Interfaces in same quadrant are:

• 17–20

• 21–24

• 25–28

• 29–32

• 33–36

• 37–40

• 41–44

• 45–48

• Resilient hashing is supported on Cisco Nexus 9500 Series switches with N9K-X9636C-R,

N9K-X9636Q-R, N9K-X9636C-RX, and N9K-X96136YC-R line cards.

• Port-channel symmetric hashing is supported on Cisco Nexus 9200, 9300-EX, 9300-FX/FX2, and

9300-GX platform switches and Cisco Nexus 9500 platform switches with , , N9K-X9736C-FX, and
N9K-X9732C-FX line cards.

• ECMP symmetric hashing is supported on Cisco Nexus 9200, 9300-EX, and 9300-FX/FX2 platform

switches and Cisco Nexus 9500 platform switches with , , N9K-X9736C-FX, and N9K-X9732C-FX line
cards.

• GRE inner headers are supported on the following switches:

• Cisco Nexus 9364C platform switches

• Cisco Nexus 9336C-FX2, 9348GC-FXP, 93108TC-FX, 93180YC-FX, and 93240YC-FX2 platform

switches

• Cisco Nexus 9300-GX platform switches.

• Cisco Nexus 9500 platform switches with N9K-X9736C-FX line cards

• Beginning with Cisco NX-OS Release 9.3(6), Cisco Nexus 9300-FX2 platform switches support the
coexistence of VXLAN and IP-in-IP tunneling. For more information, including limitations, see the
VXLAN and IP-in-IP Tunneling section in the Cisco Nexus 9000 Series NX-OS VXLAN Configuration
Guide, Release 9.3(x).

• For FEX interfaces using LACP, all DME oper/runtime properties for the FEX interfaces does not get
updated. All runtime updates for FEX ports happens from FEX LACP process context and are not
communicated to the parent switch.This is a day-1 behaviour.

• Beginning with Cisco NX-OS Release 10.3(1)F, the hashing based on src/dst ip and src/dst L4 port

number is supported on Cisco Nexus 9808 platform switches.

• From Cisco NX-OS Release 10.4(1), Layer 3 port-channel is supported on Cisco Nexus 9800, and

9332D-H2R switches.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

214

Configuring Port Channels

Guidelines and Limitations

• From Cisco NX-OS Release 10.4(2)F, Layer 3 port-channel is supported on Cisco Nexus 9232E-B1

switch.

• Beginning with Cisco NX-OS Release 10.4(1)F, the hashing based on src/dst ip and src/dst L4 port

number is supported on the following Cisco Nexus Switches:

• Cisco Nexus 9804 Platform switches

• Cisco Nexus X98900CD-A, and KX9836DM-A line cards with Cisco Nexus 9808 and 9804 switches.

• Beginning with Cisco NX-OS Release 10.4(2)F, the hashing based on src/dst ip and src/dst Layer 4 port

number is supported on Cisco Nexus C9232E-B1 switch.

• Beginning with Cisco NX-OS Release 10.5(3)F, Cisco Nexus 93C64E-SG2-Q switch supports these

features.

• LACP

• port-channel

• GTP Tunnel Load Balancing for IPv6 flow is supported only on Cisco Nexus 9500 platform switches

with FM-E2 fabric modules.

• GTP Tunnel Load Balancing is not supported on Cisco Nexus 9500 platform switches with FM-E fabric

modules

• Do not configure hashing for IPv4 or IPv6 GTP packets for GTP Tunnel Load Balancing

• Hashing for IPv4 or IPv6 GTP packets (hash-mode {gtp-inner-v4 | gtp-inner-v6}) not supported on

these plaftforms:

• N9K-C9332D-H2R

• N9K-C93640CWD-HXB

• N9K-C9364C-H1

• N9K-C93400LD-H1

Support for port channel on Cisco Nexus 9336C-SE1

• Starting with Cisco NX-OS Release 10.6(1)F, Cisco Nexus 9336C-SE1 supports these features.

• Layer 3 port-channel

• LACP

Support for port channel on Cisco N9300 Series smart switches

• Starting with Cisco NX-OS Release 10.6(1s), Cisco N9300 Series smart switches support these features.

• Layer 3 port-channel

• LACP

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

215

Default Settings

Configuring Port Channels

• Starting with Cisco NX-OS Release 10.6(2)F, Cisco N9324C-SE1U, and Cisco N9348Y2C6D-SE1U

switches support these features.

• Layer 3 port-channel

• LACP

Default Settings

The following table lists the default settings for port-channel parameters.

Table17:DefaultPort-ChannelParameters

Parameters

Port channel

Default

Admin up

Load balancing method for Layer 3 interfaces

Source and destination IP address

Load balancing method for Layer 2 interfaces

Source and destination MAC address

Load balancing per module

LACP

Channel mode

LACP system priority

LACP port priority

Minimum links for LACP

Maxbundle

Minimum links for FEX fabric port channel

Configuring Port Channels

Disabled

Disabled

on

32768

32768

1

32

1

Note

See the "Configuring Basic Interface Parameters” chapter for information about configuring the maximum
transmission unit (MTU) for the port-channel interface. See the “Configuring Layer 3 Interfaces” chapter for
information about configuring IPv4 and IPv6 addresses on the port-channel interface.

Note

If you are familiar with the Cisco IOS CLI, be aware that the Cisco NX-OS commands for this feature might
differ from the Cisco IOS commands that you would use.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

216

Configuring Port Channels

Creating a Port Channel

Creating a Port Channel

You can create a port channel before you create a channel group. The software automatically creates the
associated channel group.

Note

When the port channel is created before the channel group, the port channel should be configured with all of
the interface attributes that the member interfaces are configured with. Use the switchport mode trunk
{allowed vlan vlan-id | native vlan-id} command to configure the members.

This is required only when the channel group members are Layer 2 ports (switchport) and trunks (switchport
mode trunk).

Note

Use the no interface port-channel command to remove the port channel and delete the associated channel
group.

Command

Purpose

no interface port-channel channel-number

Example:

switch(config)# no interface port-channel 1

Removes the port channel and deletes the
associated channel group.

SUMMARY STEPS

Before you begin

Enable LACP if you want LACP-based port channels.

interface port-channel channel-number

1. configure terminal
2.
3. show port-channel summary
4. no shutdown
5. copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

217

Adding a Layer 2 Port to a Port Channel

Configuring Port Channels

Command or Action

Purpose

Step 2

interface port-channel channel-number

Example:

switch(config)# interface port-channel 1
switch(config-if)

Specifies the port-channel interface to configure, and enters
the interface configuration mode. The range is from 1 to
4096. The Cisco NX-OS software automatically creates the
channel group if it does not already exist.

Step 3

show port-channel summary

(Optional) Displays information about the port channel.

Example:

switch(config-router)# show port-channel
summary

Step 4

no shutdown

Example:

switch# configure terminal
switch(config)# int e3/1
switch(config-if)# no shutdown

Step 5

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Clears the errors on the interfaces and VLANs
where policies correspond with hardware policies. This
command allows policy programming to continue and the
port to come up. If policies do not correspond, the errors
are placed in an error-disabled policy state.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to create a port channel:

switch# configure terminal
switch (config)# interface port-channel 1

See the “Compatibility Requirements” section for details on how the interface configuration changes
when you delete the port channel.

Adding a Layer 2 Port to a Port Channel

You can add a Layer 2 port to a new channel group or to a channel group that already contains Layer 2 ports.
The software creates the port channel associated with this channel group if the port channel does not already
exist.

Note

Use the no channel-group command to remove the port from the channel group.

Command

no channel-group

Example:

switch(config)# no channel-group

Purpose

Removes the port from the channel group.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

218

Configuring Port Channels

Adding a Layer 2 Port to a Port Channel

Before you begin

Enable LACP if you want LACP-based port channels.

All Layer 2 member ports must run in full-duplex mode and at the same speed

SUMMARY STEPS

interface type slot/port

1. configure terminal
2.
3. switchport
4. switchport mode trunk
5. switchport trunk {allowed vlan vlan-id | native vlan-id}
6. channel-group channel-number [force] [mode {on | active | passive}]
7.
8. no shutdown
9. copy running-config startup-config

show interface type slot/port

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface type slot/port

Example:

switch(config)# interface ethernet 1/4
switch(config-if)#

Step 3

switchport

Example:

switch(config)# switchport

Specifies the interface that you want to add to a channel
group, and enters the interface configuration mode.

Configures the interface as a Layer 2 access port.

Step 4

switchport mode trunk

(Optional) Configures the interface as a Layer 2 trunk port.

Example:

switch(config)# switchport mode trunk

Step 5

switchport trunk {allowed vlan vlan-id | native vlan-id}

Example:

switch(config)# switchport trunk native 3
switch(config-if)#

(Optional) Configures necessary parameters for a Layer 2
trunk port.

Step 6

channel-group channel-number [force] [mode {on | active
| passive}]

Configures the port in a channel group and sets the mode.
The channel-number range is from 1 to 4096. This command

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

219

Adding a Layer 3 Port to a Port Channel

Configuring Port Channels

Command or Action

Example:

• switch(config-if)# channel-group 5

• switch(config-if)# channel-group 5 force

Purpose

creates the port channel associated with this channel group
if the port channel does not already exist. All static
port-channel interfaces are set to mode on. You must set
all LACP-enabled port-channel interfaces to active or
passive. The default mode is on.

(Optional) Forces an interface with some incompatible
configurations to join the channel. The forced interface must
have the same speed, duplex, and flow control settings as
the channel group.

Note
The force option fails if the port has a QoS policy
mismatch with the other members of the port channel.

Step 7

show interface type slot/port

(Optional) Displays interface information.

Example:

switch# show interface port channel 5

Step 8

no shutdown

Example:

switch# configure terminal
switch(config)# int e3/1
switch(config-if)# no shutdown

Step 9

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Clears the errors on the interfaces and VLANs
where policies correspond with hardware policies. This
command allows policy programming to continue and the
port to come up. If policies do not correspond, the errors
are placed in an error-disabled policy state.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to add a Layer 2 Ethernet interface 1/4 to channel group 5:

switch# configure terminal
switch (config)# interface ethernet 1/4
switch(config-if)# switchport
switch(config-if)# channel-group 5

Adding a Layer 3 Port to a Port Channel

You can add a Layer 3 port to a new channel group or to a channel group that is already configured with Layer
3 ports. The software creates the port channel associated with this channel group if the port channel does not
already exist.

If the Layer 3 port that you are adding has a configured IP address, the system removes that IP address before
adding the port to the port channel. After you create a Layer 3 port channel, you can assign an IP address to
the port-channel interface.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

220

Configuring Port Channels

Adding a Layer 3 Port to a Port Channel

Note

Use the no channel-group command to remove the port from the channel group. The port reverts to its original
configuration. You must reconfigure the IP addresses for this port.

Command

no channel-group

Example:

switch(config)# no channel-group

Purpose

Removes the port from the channel group.

Before you begin

Enable LACP if you want LACP-based port channels.

Remove any IP addresses configured on the Layer 3 interface.

SUMMARY STEPS

interface type slot/port

1. configure terminal
2.
3. no switchport
4. channel-group channel-number [force] [mode {on | active | passive}]
5. show interface type slot/port
6. no shutdown
7.

copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface type slot/port

Example:

switch(config)# interface ethernet 1/4
switch(config-if)#

Step 3

no switchport

Example:

switch(config-if)# no switchport

Specifies the interface that you want to add to a channel
group, and enters the interface configuration mode.

Configures the interface as a Layer 3 port.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

221

Configuring the Bandwidth and Delay for Informational Purposes

Configuring Port Channels

Command or Action

Purpose

Step 4

channel-group channel-number [force] [mode {on | active
| passive}]

Example:

• switch(config-if)# channel-group 5

• switch(config-if)# channel-group 5 force

Configures the port in a channel group and sets the mode.
The channel-number range is from 1 to 4096. The Cisco
NX-OS software creates the port channel associated with
this channel group if the port channel does not already exist.

(Optional) Forces an interface with some incompatible
configurations to join the channel. The forced interface must
have the same speed, duplex, and flow control settings as
the channel group.

Step 5

show interface type slot/port

(Optional) Displays interface information.

Example:

switch# show interface ethernet 1/4

Step 6

no shutdown

Example:

switch# configure terminal
switch(config)# int e3/1
switch(config-if)# no shutdown

Step 7

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Clears the errors on the interfaces and VLANs
where policies correspond with hardware policies. This
command allows policy programming to continue and the
port to come up. If policies do not correspond, the errors
are placed in an error-disabled policy state.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to add a Layer 3 Ethernet interface 1/5 to channel group 6 in on mode:

switch# configure terminal
switch (config)# interface ethernet 1/5
switch(config-if)# switchport
switch(config-if)# channel-group 6

This example shows how to create a Layer 3 port-channel interface and assign the IP address:

switch# configure terminal
switch (config)# interface port-channel 4
switch(config-if)# ip address 192.0.2.1/8

Configuring the Bandwidth and Delay for Informational Purposes

The bandwidth of the port channel is determined by the number of total active links in the channel.

You configure the bandwidth and delay on port-channel interfaces for informational purposes.

SUMMARY STEPS

1. configure terminal

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

222

Configuring Port Channels

Configuring the Bandwidth and Delay for Informational Purposes

interface port-channel channel-number

2.
3. bandwidth value
4. delay value
5. exit
6. show interface port-channel channel-number
7.

copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel channel-number

Example:

switch(config)# interface port-channel 2
switch(config-if)#

Step 3

bandwidth value

Example:

switch(config-if)# bandwidth 60000000
switch(config-if)#

Step 4

delay value

Example:

switch(config-if)# delay 10000
switch(config-if)#

Step 5

exit

Example:

switch(config-if)# exit
switch(config)#

Specifies the port-channel interface that you want to
configure, and enters the interface mode.

Specifies the bandwidth, which is used for informational
purposes. The range is from 1 to 3,200,000,000 kbs. The
default value depends on the total active interfaces in the
channel group.

Specifies the throughput delay, which is used for
informational purposes. The range is from 1 to 16,777,215
tens of microseconds. The default value is 10 microseconds.

Exits the interface mode and returns to the configuration
mode.

Step 6

show interface port-channel channel-number

Example:

switch# show interface port-channel 2

Step 7

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Displays interface information for the specified
port channel.

(Optional) Copies the running configuration to the startup
configuration.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

223

Shutting Down and Restarting the Port-Channel Interface

Configuring Port Channels

Example

This example shows how to configure the informational parameters of the bandwidth and delay for
port channel 5:

switch# configure terminal
switch (config)# interface port-channel 5
switch(config-if)# bandwidth 60000000
switch(config-if)# delay 10000
switch(config-if)#

Shutting Down and Restarting the Port-Channel Interface

You can shut down and restart the port-channel interface. When you shut down a port-channel interface, no
traffic passes and the interface is administratively down.

SUMMARY STEPS

interface port-channel channel-number

1. configure terminal
2.
3. shutdown
4. exit
5. show interface port-channel channel-number
6. no shutdown
7.

copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel channel-number

Example:

switch(config)# interface port-channel 2
switch(config-if)#

Step 3

shutdown

Example:

switch(config-if)# shutdown
switch(config-if)#

Specifies the port-channel interface that you want to
configure, and enters the interface mode.

Shuts down the interface. No traffic passes and the interface
displays as administratively down. The default is no
shutdown.

Note
Use the no shutdown command to open the interface.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

224

Configuring Port Channels

Configuring a Port-Channel Description

Command or Action

Purpose

Step 4

exit

Example:

switch(config-if)# exit
switch(config)#

The interface displays as administratively up. If there are
no operational problems, traffic passes. The default is no
shutdown.

Exits the interface mode and returns to the configuration
mode.

Step 5

show interface port-channel channel-number

Example:

switch(config-router)# show interface port-channel

(Optional) Displays interface information for the specified
port channel.

2

Step 6

no shutdown

Example:

switch# configure terminal
switch(config)# int e3/1
switch(config-if)# no shutdown

Step 7

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Clears the errors on the interfaces and VLANs
where policies correspond with hardware policies. This
command allows policy programming to continue and the
port to come up. If policies do not correspond, the errors
are placed in an error-disabled policy state.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to bring up the interface for port channel 2:

switch# configure terminal
switch (config)# interface port-channel 2
switch(config-if)# no shutdown

Configuring a Port-Channel Description

You can configure a description for a port channel.

SUMMARY STEPS

interface port-channel channel-number

1. configure terminal
2.
3. description
4. exit
5. show interface port-channel channel-number
6. copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

225

Configuring the Speed and Duplex Settings for a Port-Channel Interface

Configuring Port Channels

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel channel-number

Example:

switch(config)# interface port-channel 2
switch(config-if)#

Step 3

description

Example:

switch(config-if)# description engineering
switch(config-if)#

Step 4

exit

Example:

switch(config-if)# exit
switch(config)#

Specifies the port-channel interface that you want to
configure, and enters the interface mode.

Allows you to add a description to the port-channel
interface. You can use up to 80 characters in the description.
By default, the description does not display; you must
configure this parameter before the description displays in
the output.

Exits the interface mode and returns to the configuration
mode.

Step 5

show interface port-channel channel-number

Example:

switch# show interface port-channel 2

Step 6

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Displays interface information for the specified
port channel.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to add a description to port channel 2:

switch# configure terminal
switch (config)# interface port-channel 2
switch(config-if)# description engineering

Configuring the Speed and Duplex Settings for a Port-Channel Interface

You can configure the speed and duplex settings for a port-channel interface.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

226

Configuring Port Channels

SUMMARY STEPS

Configuring the Speed and Duplex Settings for a Port-Channel Interface

interface port-channel channel-number

1. configure terminal
2.
3. speed {10 | 100 | 1000 | auto}
4. duplex {auto | full | half}
5. exit
6. show interface port-channel channel-number
7.

copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel channel-number

Example:

switch(config)# interface port-channel 2
switch(config-if)#

Step 3

speed {10 | 100 | 1000 | auto}

Example:

switch(config-if)# speed auto
switch(config-if)#

Step 4

duplex {auto | full | half}

Example:

switch(config-if)# duplex auto
switch(config-if)#

Step 5

exit

Example:

switch(config-if)# exit
switch(config)#

Specifies the port-channel interface that you want to
configure, and enters the interface mode.

Sets the speed for the port-channel interface. The default is
auto for autonegotiation.

Sets the duplex for the port-channel interface. The default
is auto for autonegotiation.

Exits the interface mode and returns to the configuration
mode.

Step 6

show interface port-channel channel-number

Example:

switch# show interface port-channel 2

Step 7

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

(Optional) Displays interface information for the specified
port channel.

(Optional) Copies the running configuration to the startup
configuration.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

227

Configuring Load Balancing Using Port Channels

Configuring Port Channels

Example

This example shows how to set port channel 2 to 100 Mb/s:

switch# configure terminal
switch (config)# interface port-channel 2
switch(config-if)# speed 100

Configuring Load Balancing Using Port Channels

You can configure the load-balancing algorithm for port channels that applies to the entire device.

Note

Use the no port-channel load-balance command to restore the default load-balancing algorithm of
source-dest-mac for non-IP traffic and source-dest-ip for IP traffic.

Command

Purpose

no port-channel load-balance

Restores the default load-balancing algorithm.

Example:

switch(config)# no port-channel load-balance

Before you begin

Enable LACP if you want LACP-based port channels.

SUMMARY STEPS

1. configure terminal
2. port-channel load-balance method {dst ip | dst ip-gre | dst ip-l4port | dst ip-l4port-vlan | dst ip-vlan
| dst l4port | dst mac | src ip | src ip-gre | src ip-l4port | src ip-l4port-vlan | src ip-vlan | src l4port |
src mac | src-dst ip | src-dst ip-gre | src-dst ip-l4port [symmetric] | src-dst ip-l4port-vlan | src-dst
ip-vlan | src-dst l4port | src-dst mac} [fex {fex-range | all}] [ dst inner-header ] | src inner-header
| src-dst inner-header ] [rotate rotate]

3. show port-channel load-balance
4. show port-channel load-balance [forwarding-path interface port-channel channel-number |src-ip

src-ip |dst-ip dst-ip |protocol protocol |gtp-teid gtp-teid |module module_if]

5. copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

228

Configuring Port Channels

Configuring Load Balancing Using Port Channels

Command or Action
switch# configure terminal
switch(config)#

Purpose

Step 2

port-channel load-balance method {dst ip | dst ip-gre |
dst ip-l4port | dst ip-l4port-vlan | dst ip-vlan | dst l4port
| dst mac | src ip | src ip-gre | src ip-l4port | src
ip-l4port-vlan | src ip-vlan | src l4port | src mac | src-dst
ip | src-dst ip-gre | src-dst ip-l4port [symmetric] | src-dst
ip-l4port-vlan | src-dst ip-vlan | src-dst l4port | src-dst
mac} [fex {fex-range | all}] [ dst inner-header ] | src
inner-header | src-dst inner-header ] [rotate rotate]

Specifies the load-balancing algorithm for the device. The
range depends on the device. The default for Layer 3 is
src-dst ip-l4port for both IPv4 and IPv6, and the default
for non-IP is src-dst mac.

Note
GRE inner IP headers supports source, destination and
source-destination.

Example:

• switch(config)# port-channel load-balance

src-dst mac
switch(config)#

• switch(config)# no port-channel load-balance

src-dst mac
switch(config)#

• switch(config)# port-channel load-balance dst

inner-header
switch(config)#

• switch(config)# port-channel load-balance src

inner-header
switch(config)#

• switch(config)# port-channel load-balance

src-dst inner-header
switch(config)#

Step 3

show port-channel load-balance

Example:

switch(config-router)# show port-channel
load-balance

Step 4

show port-channel load-balance [forwarding-path
interface port-channel channel-number |src-ip src-ip
|dst-ip dst-ip |protocol protocol |gtp-teid gtp-teid |module
module_if]

Example:

switch# show port-channel load-balance
forwarding-path
load-balance

Note
Only the following load-balancing algorithms support
symmetric hashing:

• src-dst ip

• src-dst ip-l4port

(Optional) Displays the port-channel load-balancing
algorithm.

(Optional) Identifies the port in the EtherChannel interface
that forwards the packet.

Step 5

copy running-config startup-config

Example:

(Optional) Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

229

Configuring Load Balancing using Port Channels for MPLS Tagged Traffic

Configuring Port Channels

Configuring Load Balancing using Port Channels for MPLS Tagged Traffic

Before you begin

• The configurations port-channel load-balance and mpls load-sharing options for mpls cannot co-exist.

• For MPLS tagged L2 traffic, you can use the port-channel load-balance configuration with mpls options.

• Configuration of feature-set mpls and port-channel load-balance with mpls options are mutually exclusive.

• The port-channel load-balance with mpls option feature cannot co-exist with vxlan feature.

• The following are the guidelines and limitations for the port-channel load-balance with <non-mpls

options> with mpls label-ip:

• Both SRC and DST L2 addresses fields are overloaded with all 4 labels stack on MPLS in ASIC.
SRC-MAC is overloaded with top 3 labels and DST-MAC is overloaded with remaining 4th label.
Enabling this feature can omit SRC and DST L2 MAC fields of the MPLS IP packet for hashing.

• If the non mpls option which has impact on SRC or DST L2 address fields. It impacts label

stack hash calculation.

• The following are the guidelines and limitations for the port-channel load-balance with <non-mpls

options> with mpls label-only:

• Both SRC and DST IP address fields are overloaded with MPLS label stack (9 labels) in ASIC (i.e.
SRC-IP is overloaded with top 5 labels & DST-IP is overloaded with botom 4 labels). So, turning
on this variant in general could ignore SRC & DST IP fields of the MPLS packet for hashing.

• If the <non-mpls options> contain ‘SRC IP’ only variant, then only top 5 MPLS labels (for label

stack size of 9) would be considered for hashing.

• If the <non-mpls options> contain only DST IP variant, it considers only botom 4 MPLS labels for
hashing (for the MPLS label of stack size 9). For an example, MPLS packet which has only 5 labels,
none of these labels are considered for hashing. If you have MPLS packet with 7 labels, only botom
2 labels is considered for hashing.

• If the <non-mpls options> contain doesn’t have both SRC and DST IP fields, none of the labels are

considered for hashing.

• L4 SRC and DST ports would not be considered for hashing.

SUMMARY STEPS

1. configure terminal
2. port-channel load-balance src-dst ip-l4port mpls {label-ip|label-only}
3.

(Optional) show port-channel load-balance

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

230

Configuring Port Channels

DETAILED STEPS

Procedure

Command or Action

Configuring Inner IP Header GTP

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

port-channel load-balance src-dst ip-l4port mpls
{label-ip|label-only}

Example:

Specifies the load-balancing for MPLS using port-channel.

label-ip – Specifies load sharing based on MPLS label and
IP.

switch(config)# port-channel load-balance src-dst

ip-l4port mpls label-ip

label-only - Specific load sharing based on MPLS label
only.

Step 3

(Optional) show port-channel load-balance

Displays the port-channel load-balancing algorithm.

Example:

switch(config)# show port-channel load-balance

Example

The following is an example of load-balance configuration with mpls option:

switch# show port-channel load-balance
System config:
Non-IP: src-dst mac
IP: src-dst ip-l4port mpls label-ip rotate 0
Port Channel Load-Balancing Configura(cid:0)(cid:0)on for all modules:
Module 1:
Non-IP: src-dst mac
IP: src-dst ip-l4port mpls label-ip rotate 0

Configuring Inner IP Header GTP

Follow this procedure to enable/disable the GTP inner-header hashing:

SUMMARY STEPS

1. configure terminal
2.
3.
4. show port-channel load-balance

[no] port-channel load-balance src-dst inner-header gtp
[no] hash-mode {gtp-inner-v4 | gtp-inner-v6}

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

231

Enabling LACP

DETAILED STEPS

Configuring Port Channels

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

[no] port-channel load-balance src-dst inner-header gtp

Example:

switch(config)# port-channel load-balance src-dst

inner-header gtp

switch(config)#

Step 3

[no] hash-mode {gtp-inner-v4 | gtp-inner-v6}

Enables/disables the hashing for IPv4/IPv6 GTP packets.

Example:

for IPv4

switch(config)# hash-mode gtp-inner-v4
switch(config)#

For IPv6

switch(config)# hash-mode gtp-inner-v6
switch(config)#

Note

• Hashing for IPv4 or IPv6 GTP packets configuration
is not needed for Cisco Nexus 9364C-H1 Switch.

• Cisco Nexus 9364C-H1 switch can natively support
inner-header based hashing for packets with GTP
header of size 8 or 12 bytes

Step 4

show port-channel load-balance

Displays the port-channel load-balancing algorithm.

Example:

switch(config)# show port-channel load-balance
switch(config)#

switch# show port-channel load-balance
System config:

Non-IP: src-dst mac
IP: src-dst inner-header rotate 0

Port Channel Load-Balancing Configuration for all

modules:
Module 1:

Non-IP: src-dst mac
IP: src-dst inner-header rotate 0

Enabling LACP

LACP is disabled by default; you must enable LACP before you begin LACP configuration. You cannot
disable LACP while any LACP configuration is present.

LACP learns the capabilities of LAN port groups dynamically and informs the other LAN ports. Once LACP
identifies correctly matched Ethernet links, it group the links into a port channel. The port channel is then
added to the spanning tree as a single bridge port.

To configure LACP, you must do the following:

• Enable LACP globally by using the feature lacp command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

232

Configuring Port Channels

Configuring LACP Port-Channel Port Modes

• You can use different modes for different interfaces within the same LACP-enabled port channel. You
can change the mode between active and passive for an interface only if it is the only interface that is
designated to the specified channel group.

SUMMARY STEPS

DETAILED STEPS

1. configure terminal
2.
3. copy running-config startup-config

feature lacp

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

feature lacp

Example:

switch(config)# feature lacp

Step 3

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

Example

This example shows how to enable LACP:

switch# configure terminal
switch (config)# feature lacp

Enables LACP on the device.

(Optional) Copies the running configuration to the startup
configuration.

Configuring LACP Port-Channel Port Modes

After you enable LACP, you can configure the channel mode for each individual link in the LACP port channel
as active or passive. This channel configuration mode allows the link to operate with LACP.

When you configure port channels with no associated aggregation protocol, all interfaces on both sides of the
link remain in the on channel mode.

SUMMARY STEPS

1. configure terminal
2.

interface type slot/port

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

233

Configuring LACP Port-Channel Port Modes

Configuring Port Channels

3. channel-group number mode {active | on | passive}
4. show port-channel summary
5. copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface type slot/port

Example:

switch(config)# interface ethernet 1/4
switch(config-if)#

Step 3

channel-group number mode {active | on | passive}

Example:

switch(config-if)# channel-group 5 mode active

Step 4

show port-channel summary

Example:

switch(config-if)# show port-channel summary

Specifies the interface that you want to add to a channel
group, and enters the interface configuration mode.

Specifies the port mode for the link in a port channel. After
LACP is enabled, you configure each link or the entire
channel as active or passive.

When you run port channels with no associated aggregation
protocol, the port-channel mode is always on.

The default port-channel mode is on.

(Optional) Displays summary information about the port
channels.

Step 5

copy running-config startup-config

Example:

(Optional) Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Example

This example shows how to set the LACP-enabled interface to the active port-channel mode for
Ethernet interface 1/4 in channel group 5:

switch# configure terminal
switch (config)# interface ethernet 1/4
switch(config-if)# channel-group 5 mode active

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

234

Configuring Port Channels

Configuring LACP Port-Channel Minimum Links

Configuring LACP Port-Channel Minimum Links

You can configure the LACP minimum links feature. Although minimum links and maxbundles work only
in LACP, you can enter the CLI commands for these features for non-LACP port channels, but these commands
are nonoperational.

Note

Use the no lacp min-links command to restore the default port-channel minimum links configuration.

Command

no lacp min-links

Example:

switch(config)# no lacp min-links

Purpose

Restores the default port-channel minimum
links configuration.

SUMMARY STEPS

Before you begin

Ensure that you are in the correct port-channel interface.

1. configure terminal
2.
3.
4. show running-config interface port-channel number

interface port-channel number
lacp min-links number

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel number

Example:

switch(config)# interface port-channel 3
switch(config-if)#

Step 3

lacp min-links number

Example:

switch(config-if)# lacp min-links 3

Specifies the interface to configure, and enters the interface
configuration mode.

Specifies the port-channel interface to configure the number
of minimum links. The range is from 1 to 16.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

235

Configuring the LACP Port-Channel MaxBundle

Configuring Port Channels

Command or Action

Purpose

Step 4

show running-config interface port-channel number

Example:

switch(config-if)# show running-config interface
port-channel 3

(Optional) Displays the port-channel minimum links
configuration.

Example

This example shows how to configure the minimum number of port-channel member interfaces to
be up/active for the port-channel to be up/active:

switch# configure terminal
switch(config)# interface port-channel 3
switch(config-if)# lacp min-links 3

Configuring the LACP Port-Channel MaxBundle

You can configure the LACP maxbundle feature. Although minimum links and maxbundles work only in
LACP, you can enter the CLI commands for these features for non-LACP port channels, but these commands
are nonoperational.

Note

Use the no lacp max-bundle command to restore the default port-channel max-bundle configuration.

Command

no lacp max-bundle

Example:

switch(config)# no lacp max-bundle

Purpose

Restores the default port-channel max-bundle
configuration.

SUMMARY STEPS

Before you begin

Ensure that you are in the correct port-channel interface.

1. configure terminal
2.
3.
4. show running-config interface port-channel number

interface port-channel number
lacp max-bundle number

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

236

Configuring Port Channels

DETAILED STEPS

Procedure

Command or Action

Configuring the LACP Fast Timer Rate

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel number

Example:

switch(config)# interface port-channel 3
switch(config-if)#

Step 3

lacp max-bundle number

Example:

switch(config-if)# lacp max-bundle

Step 4

show running-config interface port-channel number

Example:

switch(config-if)# show running-config interface
port-channel 3

Specifies the interface to configure, and enters the interface
configuration mode.

Specifies the port-channel interface to configure
max-bundle.

The default value for the port-channel max-bundle is 16.
The allowed range is from 1 to 32.

Note
Even if the default value is 16, the number of active
members in a port channel is the minimum of the
pc_max_links_config and pc_max_active_members that
is allowed in the port channel.

(Optional) Displays the port-channel max-bundle
configuration.

Example

This example shows how to configure the port channel interface max-bundle:

switch# configure terminal
switch(config)# interface port-channel 3
switch(config-if)# lacp max-bundle 3

Configuring the LACP Fast Timer Rate

You can change the LACP timer rate to modify the duration of the LACP timeout. Use the lacp rate command
to set the rate at which LACP control packets are sent to an LACP-supported interface. You can change the
timeout rate from the default rate (30 seconds) to the fast rate (1 second). This command is supported only
on LACP-enabled interfaces.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

237

Configuring the LACP Fast Timer Rate

Configuring Port Channels

Note

We do not recommend changing the LACP timer rate. HA and SSO are not supported when the LACP fast
rate timer is configured.

Note

Configuring lacp rate fast is not recommended on the vPC Peer-Links. When lacp rate fast is configured
on the vPC Peer-Link member interfaces, an alert is displayed in the syslog messages only when the LACP
logging level is set to 5.

Before you begin

Ensure that you have enabled the LACP feature.

SUMMARY STEPS

DETAILED STEPS

1. configure terminal
2.
3.

interface type slot/port
lacp rate fast

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface type slot/port

Example:

switch(config)# interface ethernet 1/4
switch(config-if)#

Step 3

lacp rate fast

Example:

switch(config-if)# lacp rate fast

Specifies the interface to configure and enters the interface
configuration mode.

Configures the fast rate (one second) at which LACP control
packets are sent to an LACP-supported interface.

To reset the timeout rate to its default, use the no form of
the command.

Example

This example shows how to configure the LACP fast rate on Ethernet interface 1/4:

switch# configure terminal
switch (config)# interface ethernet 1/4
switch(config-if)# lacp rate fast

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

238

Configuring Port Channels

Configuring the LACP System Priority

This example shows how to restore the LACP default rate (30 seconds) on Ethernet interface 1/4.

switch# configure terminal
switch (config)# interface ethernet 1/4
switch(config-if)# no lacp rate fast

Configuring the LACP System Priority

The LACP system ID is the combination of the LACP system priority value and the MAC address.

Before you begin

Enable LACP.

SUMMARY STEPS

1. configure terminal
2.
lacp system-priority priority
3. show lacp system-identifier
4. copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

lacp system-priority priority

Example:

switch(config)# lacp system-priority 40000

Configures the system priority for use with LACP. Valid
values are from 1 through 65535, and higher numbers have
a lower priority. The default value is 32768.

Note
Each VDC has a different LACP system ID because the
software adds the MAC address to this configured value.

Step 3

show lacp system-identifier

(Optional) Displays the LACP system identifier.

Example:

switch(config-if)# show lacp system-identifier

Step 4

copy running-config startup-config

Example:

(Optional) Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

239

Configuring the LACP Port Priority

Configuring Port Channels

Example

This example shows how to set the LACP system priority to 2500:

switch# configure terminal
switch(config)# lacp system-priority 2500

Configuring the LACP Port Priority

When you enable LACP, you can configure each link in the LACP port channel for the port priority.

Before you begin

Enable LACP.

SUMMARY STEPS

1. configure terminal
2.
3.
4. copy running-config startup-config

interface type slot/port
lacp port-priority priority

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface type slot/port

Example:

switch(config)# interface ethernet 1/4
switch(config-if)#

Step 3

lacp port-priority priority

Example:

switch(config-if)# lacp port-priority
40000

Step 4

copy running-config startup-config

Example:

switch(config-if)# copy running-config
startup-config

Specifies the interface that you want to add to a channel
group, and enters the interface configuration mode.

Configures the port priority for use with LACP. Valid values
are from 1 through 65535, and higher numbers have a lower
priority. The default value is 32768.

(Optional) Copies the running configuration to the startup
configuration.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

240

Configuring Port Channels

Configuring LACP System MAC and Role

Example

This example shows how to set the LACP port priority for Ethernet interface 1/4 to 40000:

switch# configure terminal
switch (config)# interface ethernet 1/4
switch(config-if)# lacp port-priority 40000

Configuring LACP System MAC and Role

You can configure the MAC address used by the LACP for protocol exchanges and the optional role. By
default, the LACP uses the VDC MAC address. By default, the role is primary.

Use the no lacp system-mac command to make LACP use the default (VDC) MAC address and default role.

This procedure is supported on the Cisco Nexus 9336C-FX2, 93300YC-FX2, and 93240YC-FX2-Z switches.

Before you begin

LACP must be enabled.

SUMMARY STEPS

1. configure terminal
2.
3.
4. copy running-config startup-config

lacp system-mac mac-address role role-value
(Optional) show lacp system-identifier

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enter global configuration mode.

Example:

switch# configure terminal

Step 2

lacp system-mac mac-address role role-value

Example:

switch(config)# lacp system-mac 000a.000b.000c role

primary

switch(config)# lacp system-mac 000a.000b.000c role

secondary

Specifies the MAC address to use in the LACP protocol
exchanges. The role is optional. Primary is the default.

Step 3

(Optional) show lacp system-identifier

Displays the configured MAC address.

Example:

switch(config)# show lacp system-identifier

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

241

Disabling LACP Graceful Convergence

Configuring Port Channels

Command or Action

Purpose

Step 4

copy running-config startup-config

Example:

Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Example

The following example shows how to configure the role of a switch as primary.

Switch1# sh lacp system-identifier
32768,0-b-0-b-0-b
Switch1# sh run | grep lacp
feature lacp
lacp system-mac 000b.000b.000b role primary

The following example shows how to configure the role of a switch as secondary.

Switch2# sh lacp system-identifier
32768,0-b-0-b-0-b
Switch2# sh run | grep lacp
feature lacp
lacp system-mac 000b.000b.000b role secondary

Disabling LACP Graceful Convergence

By default, LACP graceful convergence is enabled. In situations where you need to support LACP
interoperability with devices where the graceful failover defaults may delay the time taken for a disabled port
to be brought down or cause traffic from the peer to be lost, you can disable convergence. If the downstream
access switch is not a Cisco Nexus device, disable the LACP graceful convergence option.

Note

The port channel has to be in the administratively down state before the command can be run.

Before you begin

Enable LACP.

SUMMARY STEPS

interface port-channel number

1. configure terminal
2.
3. shutdown
4. no lacp graceful-convergence
5. no shutdown
6. copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

242

Configuring Port Channels

DETAILED STEPS

Procedure

Command or Action

Reenabling LACP Graceful Convergence

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel number

Example:

switch(config)# interface port-channel 1
switch(config-if)#

Step 3

shutdown

Example:

switch(config-if) shutdown

Specifies the port channel interface to configure and enters
the interface configuration mode.

Administratively shuts down the port channel.

Step 4

no lacp graceful-convergence

Disables LACP graceful convergence on the port channel.

Example:

switch(config-if)# no lacp graceful-convergence

Step 5

no shutdown

Example:

switch(config-if) no shutdown

Step 6

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

Brings the port channel administratively up.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to disable LACP graceful convergence on a port channel:

switch# configure terminal
switch (config)# interface port-channel 1
switch(config-if)# shutdown
switch(config-if)# no lacp graceful-convergence
switch(config-if)# no shutdown

Reenabling LACP Graceful Convergence

If the default LACP graceful convergence is once again required, you can reenable convergence.

SUMMARY STEPS

1. configure terminal

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

243

Reenabling LACP Graceful Convergence

Configuring Port Channels

interface port-channel number

2.
3. shutdown
4.
5. no shutdown
6. copy running-config startup-config

lacp graceful-convergence

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel number

Example:

switch(config)# interface port-channel 1
switch(config-if)#

Step 3

shutdown

Example:

switch(config-if) shutdown

Specifies the port channel interface to configure and enters
the interface configuration mode.

Administratively shuts down the port channel.

Step 4

lacp graceful-convergence

Enables LACP graceful convergence on the port channel.

Example:

switch(config-if)# lacp graceful-convergence

Step 5

no shutdown

Example:

switch(config-if) no shutdown

Step 6

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

Brings the port channel administratively up.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to enable LACP graceful convergence on a port channel:

switch# configure terminal
switch (config)# interface port-channel 1
switch(config-if)# shutdown
switch(config-if)# lacp graceful-convergence
switch(config-if)# no shutdown

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

244

Configuring Port Channels

Disabling LACP Suspend Individual

Disabling LACP Suspend Individual

LACP sets a port to the suspended state if it does not receive an LACP PDU from the peer. This process can
cause some servers to fail to boot up as they require LACP to logically bring up the port.

Note

You should only enter the lacp suspend-individual command on edge ports. The port channel has to be in
the administratively down state before you can use this command.

Before you begin

Enable LACP.

SUMMARY STEPS

interface port-channel number

1. configure terminal
2.
3. shutdown
4. no lacp suspend-individual
5. no shutdown
6. copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel number

Example:

switch(config)# interface port-channel 1
switch(config-if)#

Step 3

shutdown

Example:

switch(config-if) shutdown

Step 4

no lacp suspend-individual

Example:

switch(config-if)# no lacp suspend-individual

Specifies the port channel interface to configure and enters
the interface configuration mode.

Administratively shuts down the port channel.

Disables LACP individual port suspension behavior on the
port channel.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

245

Reenabling LACP Suspend Individual

Configuring Port Channels

Command or Action

Purpose

Step 5

no shutdown

Example:

switch(config-if) no shutdown

Step 6

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

Brings the port channel administratively up.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to disable LACP individual port suspension on a port channel:

switch# configure terminal
switch (config)# interface port-channel 1
switch(config-if)# shutdown
switch(config-if)# no lacp suspend-individual
switch(config-if)# no shutdown

Reenabling LACP Suspend Individual

You can reenable the default LACP individual port suspension.

SUMMARY STEPS

interface port-channel number

1. configure terminal
2.
3. shutdown
4.
5. no shutdown
6. copy running-config startup-config

lacp suspend-individual

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel number

Example:

switch(config)# interface port-channel 1
switch(config-if)#

Specifies the port channel interface to configure and enters
the interface configuration mode.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

246

Configuring Port Channels

Configuring Delayed LACP

Command or Action

Purpose

Step 3

shutdown

Example:

switch(config-if) shutdown

Step 4

lacp suspend-individual

Example:

switch(config-if)# lacp suspend-individual

Step 5

no shutdown

Example:

switch(config-if) no shutdown

Step 6

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

Administratively shuts down the port channel.

Enables LACP individual port suspension behavior on the
port channel.

Brings the port channel administratively up.

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to reenable the LACP individual port suspension on a port channel:

switch# configure terminal
switch (config)# interface port-channel 1
switch(config-if)# shutdown
switch(config-if)# lacp suspend-individual
switch(config-if)# no shutdown

Configuring Delayed LACP

The delayed LACP feature enables one port channel member, the delayed LACP port, to come up first as a
member of a regular port channel before LACP PDUs are received. You configure the delayed LACP feature
using the lacp mode delaycommand on a port channel followed by configuring the LACP port priority on a
one member port of the port channel.

Note

For vPC, you must enable the delayed LACP on both vPC switches.

Note

For vPC, when the delayed LACP port is on the primary switch and the primary switch fails to boot, you need
to remove the vPC configuration on the delayed LACP port-channel of the acting primary switch and flap the
port-channel for a new port to be chosen as the delayed LACP port on the existing port-channel.

SUMMARY STEPS

1. configure terminal

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

247

Configuring Delayed LACP

Configuring Port Channels

2.
3.

interface port-channel number
lacp mode delay

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Step 2

interface port-channel number

Specifies the port channel interface to configure and enters
the interface configuration mode.

Step 3

lacp mode delay

Enables delayed LACP.

Note
To disable delayed LACP, use the no lacp mode delay
command.

Complete the configuration of the delayed LACP by
configuring the LACP port priority. See the "Configuring
the LACP Port Priority" section for details.

The priority of a LACP port determines the election of the
delayed LACP port. The port with the lowest numerical
priority is elected.

When two or more ports have the same best priority, the
VDC system MAC is used to determine which vPC is used.
Then within a non-vPC switch or the elected vPC switch,
the smallest of the ethernet port names is used.

When the delayed LACP feature is configured and made
effective with a port channel flap, the delayed LACP port
operates as a member of a regular port channel, allowing
data to be exchanged between the server and switch. After
receiving the first LACP PDU, the delayed LACP port
transitions from a regular port member to a LACP port
member.

Note
The election of the delayed LACP port is not complete or
effective until the port channel flaps on the switch or at a
remote server.

Example

The following example configures delayed LACP.

switch# config terminal
switch(config)# interface po 1

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

248

Configuring Port Channels

Configuring Port Channel Hash Distribution

switch(config-if)# lacp mode delay

switch# config terminal
switch(config)# interface ethernet 1/1
switch(config-if)# lacp port-priority 1
switch(config-if)# channel-group 1 mode active

The following example disables delayed LACP.

switch# config terminal
switch(config)# interface po 1
switch(config-if)# no lacp mode delay

Configuring Port Channel Hash Distribution

Cisco NX-OS supports the adaptive and fixed hash distribution configuration for both global and port-channel
levels. This option minimizes traffic disruption by minimizing Result Bundle Hash (RBH) distribution changes
when members come up or go down so that flows that are mapped to unchange RBH values continue to flow
through the same links. The port-channel level configuration overrules the global configuration. The default
configuration is adaptive globally, and there is no configuration for each port channel, so there is no change
during an ISSU. No ports are flapped when the command is applied, and the configuration takes effect at the
next member link change event. Both modes work with RBH module or non-module schemes.

During an ISSD to a lower version that does not support this feature, you must disable this feature if the fixed
mode command is being used globally or if there is a port-channel level configuration.

Configuring Port Channel Hash Distribution at the Global Level

SUMMARY STEPS

DETAILED STEPS

1. configure terminal
2. no port-channel hash-distribution {adaptive | fixed}
3. copy running-config startup-config

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

no port-channel hash-distribution {adaptive | fixed}

Example:

Specifies the port-channel hash distribution at the global
level.

The default is adaptive mode.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

249

Configuring Port Channel Hash Distribution at the Port Channel Level

Configuring Port Channels

Command or Action
switch(config)# port-channel hash-distribution
adaptive
switch(config)#

Step 3

copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

Purpose

The command does not take effect until the next member
link event (link down/up/no shutdown/shutdown). (Do you
still want to continue(y/n)? [yes])

(Optional) Copies the running configuration to the startup
configuration.

Example

This example shows how to configure hash distribution at the global level:

switch# configure terminal
switch(config)# no port-channel hash-distribution fixed

Configuring Port Channel Hash Distribution at the Port Channel Level

SUMMARY STEPS

interface port-channel {channel-number | range}

1. configure terminal
2.
3. no port-channel port hash-distribution {adaptive | fixed}
4. copy running-config startup-config

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface port-channel {channel-number | range}

Example:

switch# interface port-channel 4
switch(config-if)#

Step 3

no port-channel port hash-distribution {adaptive | fixed}

Example:

switch(config-if)# port-channel port
hash-distribution adaptive
switch(config-if)

Specifies the interface to configure, and enters the interface
configuration mode.

Specifies the port-channel hash distribution at the port
channel level.

There is no default.

The command does not take effect until the next member
link event (link down/up/no shutdown/shutdown). (Do you
still want to continue(y/n)? [yes])

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

250

Configuring Port Channels

Enabling ECMP Resilient Hashing

Command or Action

Purpose

Step 4

copy running-config startup-config

Example:

(Optional) Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Example

This example shows how to configure hash distribution as a global-level command:

switch# configure terminal
switch(config)# no port-channel hash-distribution fixed

Enabling ECMP Resilient Hashing

Resilient ECMP ensures minimal impact to the existing flows when members are deleted from an ECMP
group. This is achieved by replicating the existing members in a round-robin fashion at the indices that were
previously occupied by the deleted members.

SUMMARY STEPS

1. configure terminal
2. hardware profile ecmp resilient
3. copy running-config startup-config
4. reload

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal

Step 2

hardware profile ecmp resilient

Example:

switch(config)# hardware profile ecmp resilient

Enables ECMP resilient hashing and displays the following:
Warning: The command will take effect after next
reload.

Note
This command is not supported on Cisco Nexus 9808/9804
platform switches.

Step 3

copy running-config startup-config

Example:

Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

251

Disabling ECMP Resilient Hashing

Command or Action

Step 4

reload

Example:

switch(config)# reload

Configuring Port Channels

Purpose

Reboots the switch.

Disabling ECMP Resilient Hashing

SUMMARY STEPS

Before you begin

ECMP resilient hashing is enabled.

1. configure terminal
2. no hardware profile ecmp resilient
3. copy running-config startup-config
4. reload

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enters global configuration mode.

Example:

switch# configure terminal

Step 2

no hardware profile ecmp resilient

Example:

switch(config)# no hardware profile ecmp resilient

Disables ECMP resilient hashing and displays the following:
Warning: The command will take effect after next
reload.

Step 3

copy running-config startup-config

Example:

Copies the running configuration to the startup
configuration.

switch(config)# copy running-config startup-config

Step 4

reload

Reboots the switch.

Example:

switch(config)# reload

Configuring ECMP Load Balancing

To configure the ECMP load-sharing algorithm, use the following command in global configuration mode:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

252

Configuring Port Channels

Configuring ECMP Load Balancing

Before you begin

SUMMARY STEPS

1.

2.

3.

ip load-sharing address {destination port destination | source-destination [port source-destination
| gre | gtpu | ipv6-flowlabel | ttl | udf offset offset length length | symmetricinner allgreheader]}
[universal-id seed] [rotate rotate] [concatenation]
(Optional) ip load-sharing address {source |destination port destination | source-destination [port
source-destination[rocev2[opcode | psn | queuepair]]]} [universal-id seed]
(Optional) show ip load-sharing

DETAILED STEPS

Procedure

Command or Action

Step 1

ip load-sharing address {destination port destination |
source-destination [port source-destination | gre | gtpu
| ipv6-flowlabel | ttl | udf offset offset length length |
symmetricinner allgreheader]} [universal-id seed] [rotate
rotate] [concatenation]

Example:

ip load-sharing address source-destination

Example:

switch(config)# ip load-sharing address
source-destination ipv6-flowlabel

Example:

switch(config)# ip load-sharing address
source-destination ttl

Example:

switch(config)# ip load-sharing address
source-destination udf offset 8 length 8

Example:

switch(config)# [no] ip load-sharing address
source-destination port source-destination
symmetric

Example:

switch(config)# ip load-sharing address
source-destination port source-destination inner
[all|greheader]

Purpose

Configures the ECMP load-sharing algorithm for data
traffic.

• The gre option specifies the source-destination value
for the Generic Routing Encapsulation (GRE) key.

• The gtpu option specifies the GPRS Tunneling

Protocol (GTP) tunnel endpoint identifier (TEID) value
for the port source-destination.

• The ipv6-flowlabel option includes the IPv6 flow
label for computing ECMP hashing. It ensures that
traffic flows are distributed on all links based on
different flow label values. Enabling or disabling this
option also enables or disables it for port-channel
load-balancing if Layer 4 parameters are enabled using
the port-channel load-balance command. Only the
following devices support this option:

• Cisco Nexus 9364C and 9300-EX/FX/FX2

platform switches

• Cisco Nexus 9500 platform switches with

X9700-EX/FX line cards and FM-E2 fabric
modules in all routing modes

• Cisco Nexus 9500 platform switches with
X9700-EX/FX line cards and FM-E fabric
modules in non-hierarchical routing modes where
IPv6 routes are programmed in the line card

• Beginning with Cisco NX-OS Release 9.3(5),

Cisco Nexus N9K-C9316D-GX,
N9K-C93600CD-GX, N9K-C9364C-GX switches
support this option.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

253

Configuring ECMP Load Balancing

Configuring Port Channels

Command or Action

Purpose

• The ttl option includes time-to-live information for
computing ECMP hashing. It ensures that traffic flows
are distributed on all links based on different TTL
values. For IPv4 flows, it is based on ttl values. For
IPv6 flows, it is based on hop limit. Enabling or
disabling this option also enables or disables it for
port-channel load-balancing if Layer 4 parameters are
enabled using the port-channel load-balance
command. Only Cisco Nexus 9364C and
9300-EX/FX/FX2 platform switches support this
option. Beginning with Cisco NX-OS Release 9.3(5),
Cisco Nexus N9K-C9316D-GX, N9K-C93600CD-GX,
N9K-C9364C-GX switches support this option.

• The udf option includes the user-defined field for
computing ECMP hashing. You can configure the
offset base and the length of the UDF field (in bits).
The range for the offset base is from 0 to 127 bytes.
The range for the length of the UDF field is from 1 to
32 bits. Enabling or disabling this option also enables
or disables it for port-channel load-balancing if Layer
4 parameters are enabled using the port-channel
load-balance command. Only Cisco Nexus 9364C
and 9300-EX/FX/FX2 platform switches support this
option. Beginning with Cisco NX-OS Release 9.3(5),
Cisco Nexus N9K-C9316D-GX, N9K-C93600CD-GX,
N9K-C9364C-GX switches support this option.

• The symmetric option enables symmetric hashing
globally. To disable ECMP symmetric hashing, use
the no keyword in the command. You must execute
this command in global configuration mode.

Note
Ensure that the configured universal-id seed value
is consistent across the nodes in the path of ECMP
symmetric hashing for symmetric hashing to work
effectively.

• The inner option enables inner header based hashing
for GRE traffic globally. To disable inner header based
hashing, use the no keyword in the command. You
must execute this command in global configuration
mode.

• all : Configuring this option for GRE

encapsulated packets starts using inner headers
to hash onto a path in ECMP, which may impact
other encapsulation types as well. This is
supported on Cisco Nexus 9364C and
9300-EX/FX/FX2 platform switches; and Cisco

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

254

Configuring Port Channels

Configuring ECMP Load Balancing

Command or Action

Purpose

Nexus 9500 platform switches with
X9700-EX/FX line cards.

• greheader : Configuring this option only for GRE
encapsulated packets, starts using inner headers
to hash onto a path in ECMP. This is supported
on Cisco Nexus 9364C and 9300-FX/FX2
platform switches; and Cisco Nexus 9500
platform switches with X9700-FX line cards.

The following options are available for all IP load sharing
configurations:

• The universal-id option sets the random seed for the
hash algorithm and shifts the flow from one link to
another.

You do not need to configure the universal ID. Cisco
NX-OS chooses the universal ID if you do not
configure it. The universal-id range is from 1 to
4294967295.

• The rotate option causes the hash algorithm to rotate
the link picking selection so that it does not continually
choose the same link across all nodes in the network.
It does so by influencing the bit pattern for the hash
algorithm. This option shifts the flow from one link to
another and load balances the already load-balanced
(polarized) traffic from the first ECMP level across
multiple links.

If you specify a rotate value, the 64-bit stream is
interpreted starting from that bit position in a cyclic
rotation. The rotate range is from 1 to 63, and the
default is 32.

Note
With multi-tier Layer 3 topology, polarization is
possible. To avoid polarization, use a different rotate
bit at each tier of the topology.

Note
To configure a rotation value for port channels, use
the port-channel load-balance src-dst ip-l4port
rotate rotate command.

• The concatenation option ties together the hash tag
values for ECMP and the hash tag values for port
channels in order to use a stronger 64-bit hash. If you
do not use this option, you can control ECMP
load-balancing and port-channel load-balancing
independently. The default is disabled.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

255

Verifying the ECMP Resilient Hashing Configuration

Configuring Port Channels

Command or Action

Purpose

Step 2

(Optional) ip load-sharing address {source |destination
port destination | source-destination [port
source-destination[rocev2[opcode | psn | queuepair]]]}
[universal-id seed]

Configures the ECMP and DLB ECMP load-sharing
algorithm for data traffic only on Cisco Nexus
93C64E-SG2-Q, Cisco Nexus 9364E-SG2-O Silicon One
switches.

Example:

switch(config)# ip load-sharing address source
universal-id 2

switch(config)# ip load-sharing address
source-destination universal-id 2

switch(config)# ip load-sharing address destination

port destination universal-id 2

switch(config)# ip load-sharing address
source-destination universal-id 2

switch(config)# ip load-sharing address
source-destination port source-destination rocev2

opcode universal-id 2

Step 3

(Optional) show ip load-sharing

Example:

switch(config)# show ip load-sharing
address source-destination

Apart from 5-tuple (source IP, destination IP, destination
port, source port, and IPv4 protocol), the ip load-sharing
command supports the following options:

• rocev2—The rocev2 parameters are used for

load-balancing. Use any one or a combination of
parameters from opcode, psn, and queuepair.

Note
When rocev2 psn is used for load balancing, it can
cause packet reordering.

• universal-id—This option sets the random seed for
the hash algorithm and shifts the flow from one link
to another. If you do not configure the universal ID,
Cisco NX-OS configures it. The range for universal
ID is from 1 to 65535.

Note
The universal-id option is not used for the DLB
ECMP flow signature.

While configuring the ip load-sharing command,

• for ECMP, if you choose any one of the 5 tuple

options, the flow signature considers only that option.

• for Dynamic Load Balancing (DLB) ECMP, the flow
signature always uses all 5 tuple options even if you
choose any one or more of the 5 tuple options.

For more information about IP load sharing on Silicon One
switches for DLB ECMP, refer to the Dynamic Load
Balancing on Silicon One switches section in the Cisco
Nexus 9000 Series NX-OS Unicast Routing Configuration
Guide on Cisco.com.

Displays the ECMP load-sharing algorithm for data traffic.
This command also displays the DLB ECMP load-sharing
algorithm for data traffic only on Cisco Nexus
93C64E-SG2-Q, Cisco Nexus 9364E-SG2-O Silicon One
switches.

Verifying the ECMP Resilient Hashing Configuration

To display ECMP Resilient Hashing configuration information, perform one of the following tasks:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

256

Configuring Port Channels

Verifying the Port-Channel Configuration

Command

Purpose

switch(config)# show running-config | grep
"hardware profile ecmp resilient
hardware profile ecmp resilient
switch(config)#

Displays the enabled status.

switch(config)# show running-config | grep
"hardware profile ecmp resilient
switch(config)#

Displays the disabled status.

Verifying the Port-Channel Configuration

To display port-channel configuration information, perform one of the following tasks:

Command

Purpose

show interface port-channel channel-number

Displays the status of a port-channel interface.

show feature

Displays enabled features.

load- interval {interval seconds {1 | 2 | 3}}

show port-channel compatibility-parameters

Sets three different sampling intervals to bit-rate and
packet-rate statistics.

Displays the parameters that must be the same among
the member ports in order to join a port channel.

show port-channel database [interface
port-channel channel-number]

Displays the aggregation state for one or more
port-channel interfaces.

show port-channel load-balance

Displays the type of load balancing in use for port
channels.

show port-channel summary

Displays a summary for the port-channel interfaces.

show port-channel traffic

Displays the traffic statistics for port channels.

show port-channel usage

show lacp {counters [interface port-channel
channel-number] | [interface type/slot] | neighbor
[interface port-channel channel-number] |
port-channel [interface port-channel
channel-number] | system-identifier]]}

Displays the range of used and unused channel
numbers.

Displays information about LACP.

show running-config interface port-channel
channel-number

Displays information about the running configuration
of the port-channel.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

257

Monitoring the Port-Channel Interface Configuration

Configuring Port Channels

Monitoring the Port-Channel Interface Configuration

Use the following commands to display port-channel interface configuration information.

Command

clear counters interface port-channel
channel-number

Purpose

Clears the counters.

clear lacp counters [interface port-channel
channel-number]

Clears the LACP counters.

load- interval {interval seconds {1 | 2 | 3}}

show interface counters [module module]

show interface counters detailed [all]

Sets three different sampling intervals to bit-rate and
packet-rate statistics.

Displays input and output octets unicast packets,
multicast packets, and broadcast packets.

Displays input packets, bytes, and multicast and output
packets and bytes.

show interface counters errors [module module]

Displays information about the number of error
packets.

show lacp counters

Displays statistics for LACP.

Example Configurations for Port Channels

This example shows how to create an LACP port channel and add two Layer 2 interfaces to that port channel:

switch# configure terminal
switch (config)# feature lacp
switch (config)# interface port-channel 5
switch (config-if)# interface ethernet 1/4
switch(config-if)# switchport
switch(config-if)# channel-group 5 mode active
switch(config-if)# lacp port priority 40000
switch(config-if)# interface ethernet 1/7
switch(config-if)# switchport
switch(config-if)# channel-group 5 mode

This example shows how to add two Layer 3 interfaces to a channel group. The Cisco NX-OS software
automatically creates the port channel:

switch# configure terminal
switch (config)# interface ethernet 1/5
switch(config-if)# no switchport
switch(config-if)# no ip address
switch(config-if)# channel-group 6 mode active
switch (config)# interface ethernet 2/5
switch(config-if)# no switchport
switch(config-if)# no ip address
switch(config-if)# channel-group 6 mode active
switch (config)# interface port-channel 6

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

258

Configuring Port Channels

Related Documents

switch(config-if)# ip address 192.0.2.1/8

Related Documents

Related Topic

System management

High availability

Document Title

Cisco Nexus 9000 Series NX-OS System Management
Configuration Guide

Cisco Nexus 9000 Series NX-OS High Availability
and Redundancy Guide

Licensing

Cisco NX-OS Licensing Guide

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

259

Related Documents

Configuring Port Channels

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

260

