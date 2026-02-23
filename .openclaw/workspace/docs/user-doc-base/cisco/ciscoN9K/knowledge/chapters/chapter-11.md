# Chapter 11


Configuring Port VLAN Mapping on VLANs

This chapter contains these sections:

• Port VLAN Mappings, on page 377
• Guidelines and Limitations for Port VLAN Mapping on VLANs, on page 378
• Configure Port VLAN Mapping on VLANs, on page 379

Port VLAN Mappings

When a service provider has multiple customers connecting to the same physical switch using the same VLAN
encapsulation, but they should not be on the same Layer 2 segment, translating the incoming VLAN to a
unique VLAN/VNI is the right way to extend the segment.

• Allows multiple customers to use the same VLAN encapsulation on the same switch without sharing a

Layer 2 segment.

• Translates incoming VLANs to unique VLANs or VNIs for each customer.

• Supported on Cisco Nexus 9300-EX/FX/FX2/FX3/GX/GX2, C9408 platform switches, and Cisco Nexus

9500 switches with 9700-EX/FX/GX line cards (beginning with Cisco NX-OS Release 10.3(3)F).

Port VLAN mapping enables translation between ingress (incoming) VLANs and local (translated) VLANs
on a port.

• Traffic arriving on an interface with VLAN translation enabled is mapped from the incoming VLAN to

a translated VLAN.

• On the underlay, the inner dot1q is deleted and switched over to the non-VXLAN network.

• On the outgoing interface, traffic is converted back to the original VLAN and egressed out.

• VLAN counters should be checked on the translated VLAN, not on the ingress VLAN.

Example scenario:

• Two customers, Blue and Red, connect to the leaf using VLAN 10 as their encapsulation.

• VLAN 10 for Customer Blue (on interface E1/1) is mapped to VLAN 100.

• VLAN 10 for Customer Red (on interface E1/2) is mapped to VLAN 200.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

377

Guidelines and Limitations for Port VLAN Mapping on VLANs

Configuring Port VLAN Mapping on VLANs

• On the other leaf, the mapping is reversed: incoming VLAN 100 is mapped to VLAN 10 on Interface

E1/1, and VLAN 200 is mapped to VLAN 10 on Interface E1/2.

Figure36:LogicalTrafficFlow

Guidelines and Limitations for Port VLAN Mapping on VLANs

The following are the guidelines and limitations for Port VLAN Mapping.

• Beginning with Cisco NX-OS Release 10.3(3)F, Port VLAN mapping on VLANs is supported on Cisco
Nexus 9300-EX/FX/FX2/FX3/GX/GX2, C9408 platform switches and Cisco Nexus 9500 switches with
9700-EX/FX/GX line cards.

• Beginning with Cisco NX-OS Release 10.4(1)F, Port VLAN mapping on VLANs is supported on Cisco

Nexus 9332D-H2R switch.

• Beginning with Cisco NX-OS Release 10.4(2)F, Port VLAN mapping on VLANs is supported on Cisco

Nexus 93400LD-H1 switch.

• The ingress (incoming) VLAN does not need to be configured on the switch as a VLAN. The translated

VLAN must be configured.

• All Layer 2 source address learning and Layer 2 MAC destination lookup occurs on the translated VLAN.

See the VLAN counters on the translated VLAN and not on the ingress (incoming) VLAN.

• Port VLAN mapping routing supports configuring an SVI on the translated VLAN.

• The following example shows incoming VLAN 10 being mapped to local VLAN 100:

interface ethernet1/1
switchport vlan mapping 10 100

• The following is an example of overlapping VLAN for PV translation. In the first statement, VLAN-102

is a translated VLAN. In the second statement, VLAN-102 is the VLAN where it is translated to
VLAN-103:

interface ethernet1/1
switchport vlan mapping 101 102
switchport vlan mapping 102 103

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

378

Configuring Port VLAN Mapping on VLANs

Configure Port VLAN Mapping on VLANs

• When adding a member to an existing port channel using the force command, the "mapping enable"

configuration must be consistent. For example:

Int po 101
switchport vlan mapping enable
switchport vlan mapping 101 10
switchport trunk allowed vlan 10

int eth 1/8
/***No configuration***/

Note

The switchport VLAN mapping enable command is supported only when the
port mode is trunk.

• VLAN mapping helps with VLAN localization to a port, scoping the VLANs per port. A typical use case
is in the service provider environment where the service provider leaf switch has different customers
with overlapping VLANs that come in on different ports. For example, customer A has VLAN 10 coming
in on Eth 1/1 and customer B has VLAN 10 coming in on Eth 2/2.

• Port VLAN mapping does not coexist with PVLAN.

• If the inherit port-profile command is configured on a PV interface, use the no inherit port-profile

<profile name> command to detach and then execute the no switchport vlan mapping all command.

• If the system dot1q-tunnel transit vlan provider_vlan_list command is globally configured on the

switch, do not set the provider VLAN as the native or access port VLAN for any other trunk or access
port on the system. It is expected to choose provider VLANs other than the native VLANs on the system.

Configure Port VLAN Mapping on VLANs

Before you begin

• Ensure that the physical or port channel on which you want to implement VLAN translation is configured

as a Layer 2 trunk port.

• Ensure that the translated VLANs are created on the switch and are also added to the Layer 2 trunk ports

trunk-allowed VLAN vlan-list.

Note

As a best practice, do not add the ingress VLAN ID to the switchport allowed
vlan-list under the interface.

Procedure

Step 1

Use the configure terminal command to enter global configuration mode.

Example:

switch# configure terminal

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

379

Configure Port VLAN Mapping on VLANs

Configuring Port VLAN Mapping on VLANs

Step 2

Use the interface type/port command to specify the interface that you are configuring.

Example:

switch(config)# interface Ethernet1/1

Step 3

Use the [no] switchport vlan mapping enable command to enable VLAN translation on the switch port.

Example:

switch(config-if)# [no] switchport vlan mapping enable

Enables VLAN translation on the switch port. VLAN translation is disabled by default.

Note
Use the no form of this command to disable VLAN translation.

Step 4

Use the [no] switchport vlan mapping vlan-id translated-vlan-id command to translate a VLAN to another VLAN.

Example:

switch(config-if)# switchport vlan mapping 10 100

Translates a VLAN to another VLAN.

• The range for vlan-id is from 1 to 4094. For translated-vlan-id, only non-reserved VLAN IDs are allowed.

• You can configure VLAN translation between the ingress (incoming) VLAN and a local (translated) VLAN on a

port. For the traffic arriving on the interface where VLAN translation is enabled, the incoming VLAN is mapped to
a translated VLAN.

Routing of traffic happens in context of SVI for translated VLAN. On the outgoing interface, where VLAN translation
is configured, the traffic is converted to the original VLAN and egresses out.

Note
Use the no form of this command to clear the mappings between a pair of VLANs.

Step 5

Use the no switchport vlan mapping all command to remove all VLAN mappings configured on the interface.

Example:

switch(config-if)# no switchport vlan mapping all

Step 6

Use the copy running-config startup-config command to copy the running configuration to the startup configuration.

Example:

switch(config-if)# copy running-config startup-config

Note
The VLAN translation configuration does not become effective until the switch port becomes an operational trunk port.

Step 7

Use the show interface [if-identifier] vlan mapping command to display VLAN mapping information for a range of
interfaces or for a specific interface.

Example:

switch# show interface ethernet1/1 vlan mapping

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

380

Configuring Port VLAN Mapping on VLANs

Configure Port VLAN Mapping on VLANs

This example shows how to configure VLAN translation between (the ingress) VLAN 10 and (the
local) VLAN 100. The show vlan counters command output shows the statistic counters as translated
VLAN instead of customer VLAN.

switch# configure terminal
switch(config)# interface ethernet1/1
switch(config-if)# switchport vlan mapping enable
switch(config-if)# switchport vlan mapping 10 100
switch(config-if)# switchport trunk allowed vlan 100
switch(config-if)# show interface ethernet1/1 vlan mapping
Interface eth1/1:
Original VLAN
------------------
10

Translated VLAN
---------------

100

switch(config-if)# show vlan counters
Vlan Id
Unicast Octets In
Unicast Packets In
Multicast Octets In
Multicast Packets In
Broadcast Octets In
Broadcast Packets In
Unicast Octets Out
Unicast Packets Out
L3 Unicast Octets In
L3 Unicast Packets In

:100
:292442462
:1950525
:14619624
:91088
:14619624
:91088
:304012656
:2061976
:0
:0

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

381

Configure Port VLAN Mapping on VLANs

Configuring Port VLAN Mapping on VLANs

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

382

