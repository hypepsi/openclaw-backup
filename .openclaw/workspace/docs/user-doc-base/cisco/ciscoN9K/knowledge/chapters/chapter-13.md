# Chapter 13

Configuring Unidirectional Ethernet

This chapter describes how to configure Unidirectional Ethernet on the Cisco Nexus 9000 series switches.

• Unidirectional Ethernet, on page 419
• Best practices for Unidirectional Ethernet configuration, on page 419
• Configure Unidirectional Ethernet, on page 421
• Configure UDE policers , on page 422

Unidirectional Ethernet

Unidirectional Ethernet (UDE) is a network technology that lets you communicate using a single fiber strand
for transmitting or receiving data.

With unidirectional links, you can transmit or receive traffic video streaming applications. In these scenarios,
most traffic is sent as one-way streams that are not acknowledged.

To create a unidirectional link, configure the port with a bidirectional transceiver so it transmits or receives
traffic in one direction.

Use UDE when an appropriate unidirectional transceiver is not available. If transmit-only transceivers are
unavailable, configure transmit-only links with software-based UDE.

In certain cases, if you must block all control traffic leaving the interface to prevent a network outage, use the
QoS template to block all outgoing traffic on specific Ethernet ports.

Best practices for Unidirectional Ethernet configuration

Use these best practices and recommendations to configure UDE on your Nexus switches

• Configure UDE in send-only mode on your Nexus switches. You cannot use UDE receive-only in releases

before Cisco NX-OS Release 10.1(2).

• You can enable UDE on all ports at the same time.

• You can use breakout support for UDE starting with Cisco NX-OS Release 10.1(1) and later.

• Port flapping may occur when you configure UDE on a port. You can add physical interfaces with and
without UDE configuration into a port-channel. Only add send-only interfaces are added to a port channel.

If you mix send-only configuration with other interfaces, UDE might not work.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

419

Best practices for Unidirectional Ethernet configuration

Configuring Unidirectional Ethernet

• If you configure all members of the port channel as UDE send-only, the port channel may not receive

packets.

• Special control plane traffic pruning is not configurable on send-only ports.

• Unidirectional ports do not support features or protocols that require negotiation with the remote port.

Disable all features that require bi-directional communication.

Guidelines for UDE Policers

Beginning with Cisco NX-OS Release 10.3(3), you can use QoS template-based UDE. These are the guidelines
and limitations for UDE policers.

• Enable the UDE template only on Layer 2 interfaces. Set the port to tap-aggregation mode.

• The policy-map default-ndb-out-policy is not supported under system QoS. To support this feature,

carve the egress Layer 2 QoS TCAM region.

After you reboot the switch, it might take some time to apply the default-ndb-out-policy to the configured
interface. During this period, some packets may be forwarded. After the policy is applied, the switch
drops all egress control and flood traffic.

Even if there is no data traffic, the control traffic protocols (such as CDP, LLDP, ARP, and BPDU from
the CPU) match the ACL entry and are dropped, which increments the violated count This behavior is
expected when when you configure default-ndb-out-policy.

• You can use QoS template-based UDE on Cisco Nexus 9300-FX, FX2, FX3, GX, GX2 Series switches,

and Cisco Nexus 9500 Series switches with 9700-FX or GX line cards.

• You cannot use QoS template on port channels.

UDE support on Nexus switches

• UDE support is available only for native 10G-LR/10G-LRS transceivers. UDE cannot be used with

QSAs or breakout cables.

• Beginning with Cisco NX-OS Release 10.1(2), UDE is supported on these Cisco Nexus switches:

• N9K-X9624D-R2

• N9K-X9636Q-R

• N9K-X9636C-RX

• N9K-X96136YC-R

• N9K-X9624D-R2

• N9K-X9636C-R

• You can use UDE at the hardware level only on Cisco Nexus 9500 switches with X97160YC-EX line

cards

• Beginning with Cisco NX-OS Release 10.1(1), UDE is supported on these switches:

• Cisco Nexus 9000 FX, FX2 and FX3 platform switches

• N9K-C9336C-FX2

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

420

Configuring Unidirectional Ethernet

Configure Unidirectional Ethernet

• N9KC93240YC-FX2

• N9K-C93180YC-FX

• N9K-C93360YC-FX2 TOR switches

• N9K-X97160YC-EX line card.

• Beginning with Cisco NX-OS Release 10.1(1), UDE supports the following transceivers: 10G-SR,

10G-AOC, 40G-SR, 40G-LR, 40G-AOC, 100G-SR, 100G-LR, and 100G-AOC.

Configure Unidirectional Ethernet

Configure the ethernet interface for unidirectional communication on the switch. Set the interface to send-only
or receive-only mode.

Procedure

Command or Action

Purpose

Step 1

Enter interface configuration mode using the interface
ethernet {type slot /port} command.

Example:

switch(config)# interface ethernet 3/1

Step 2

Configure send-only mode using the unidirectional
send-only command.

Example:

switch(config-if)# unidirectional send-only

Step 3

Configure receive-only mode using the unidirectional
receive-only command.

Example:

switch(config-if)# unidirectional receive-only

Step 4

Exit interface mode using the exit command.

Example:

switch(config)# exit

Step 5

Display the running configuration for the interface using
the show running-config interface {type slot /port}
command.

Example:

switch(config)# show running-config interface
ethernet 3/1

Step 6

Save the configuration using the copy running-config
startup-config command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

421

Configure UDE policers

Configuring Unidirectional Ethernet

Command or Action

Example:

Purpose

switch(config)# copy running-config startup-config

You have configured the Ethernet interface for unidirectional operation.

Example

This example shows how to configure an Ethernet interface for send-only unidirectional
communication.

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# unidirectional send-only
switch(config-if)# exit
switch(config)# exit
switch#

This example shows how to display the running configuration for the interface to verify the
unidirectional setting and save the configuration.

switch# show running-config interface ethernet 3/1
!
interface ethernet 3/1

unidirectional send-only

!

Configure UDE policers

Block or limit all egress traffic on the Ethernet ports using a Unidirectional Ethernet (UDE) QoS policy.

To configure Unidirectional Ethernet with a QoS template, use these steps.

Procedure

Step 1

Configure the TCAM (Ternary Content Addressable Memory) region for egress Layer 2 QoS to allocate resources using
the hardware access-list tcam region egr-l2-qos 256 command.

Set the size of this region to 256 entries.

Step 2

Save the running configuration (including the TCAM region change) using copy run start command.

Saving the changes keeps the configuration after a reload.

Step 3

Reload the switch with the reload command to apply the changes for the new TCAM configuration.

Example:

switch(config)# hardware access-list tcam region egr-l2-qos 256

You must reboot the switch after modifying TCAM regions for the changes to take effect.

Step 4

Enter interface configuration mode for the Ethernet interface using the interface type slot/port command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

422

Configuring Unidirectional Ethernet

Configure UDE policers

Example:

switch(config)# interface Ethernet 1/6
switch(config-if)#

Step 5

Apply the UDE QoS service policy to the interface using the service-policy type qos output default-ndb-out-policy
command.

The switch polices all egress traffic on the Ethernet interface. The switch forwards only traffic that meets the configured
parameters and drops traffic that violates them.

The attached QoS policy limits or blocks all egress traffic on the Ethernet port. Only traffic that conforms to
the configured policing parameters is forwarded; all traffic that violates these parameters is dropped

What to do next

Verify policy status using show policy-map type qos default-ndb-out-policy command.

switch# show policy-map type qos default-ndb-out-policy

Type qos policy-maps
====================
policy-map type qos default-ndb-out-policy
class class-ndb-default
police cir 0 bps conform transmit violate drop

Verify the UDE police statistics for a specific interface.

switch# show policy-map interface Ethernet 1/6 output type qos

Global statistics status : enabled
Ethernet1/6
Service-policy (qos) output: default-ndb-out-policy
SNMP Policy Index: 285213501
Class-map (qos): class-ndb-default (match-any)
Slot 1
61211339 packets 15669992128 bytes
5 minute offered rate 17721223780 bps
Aggregate forwarded :
61211339 packets 110848 bytes
police cir 0 bps
conformed 0 bytes, n/a bps action: transmit
violated 15669881280 bytes, n/a bps action: drop

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

423

Configure UDE policers

Configuring Unidirectional Ethernet

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

424

