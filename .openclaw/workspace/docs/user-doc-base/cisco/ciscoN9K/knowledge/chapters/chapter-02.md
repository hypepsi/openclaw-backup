# Chapter 2


Overview

• Licensing requirements, on page 5
• Supported platforms, on page 5
• Interface parameters , on page 5
• Virtual device contexts, on page 17
• High availability for interfaces, on page 17

Licensing requirements

See the Cisco NX-OS Licensing Guide and Cisco NX-OS Licensing Options Guide for Cisco NX-OS
licensing recommendations and instructions to obtain and apply licenses.

Supported platforms

See the Nexus Switch Platform Support Matrix to know from which Cisco NX-OS releases various Cisco
Nexus 9000 and 3000 switches support a selected feature.

Interface parameters

Interface parameters are configuration settings that

• define the operational characteristics of network interfaces,

• enable administrators to tailor interface behavior for specific roles, and

• support enhancements to performance, security, and connectivity.

Cisco NX-OS supports multiple configuration parameters for each supported interface type. Most of these
parameters are described in this guide. Some parameters are described in other documents

The table provides sources for more information about configurable interface parameters.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

5

Best practice for Ethernet interfaces

Overview

Table2:InterfaceParameters

Feature

Parameters

Further Information

Basic parameters

Description, duplex, error disable,
flow control, MTU, beacon

“Configuring Basic Interface
Parameters”

Layer 3

Layer 3

Port channels

Security

Medium, IPv4 and IPv6 addresses

“Configuring Layer 3 Interfaces”

Bandwidth, delay, IP routing,
Virtual Routing and Forwarding
(VRFs)

Cisco Nexus 9000 Series NX-OS
Unicast Routing Configuration
Guide

Cisco Nexus 9000 Series NX-OS
Multicast Routing Configuration
Guide

Channel group, Link Aggregation
Control Protocol (LACP)

“Configuring Port Channels”

Ethernet OAM Unidirectional
(EOU)

Cisco Nexus 9000 Series NX-OS
Security Configuration Guide

Best practice for Ethernet interfaces

Ethernet interfaces have these characteristics.

• Ethernet interfaces include routed ports.

Access ports

Routed ports

An access port is a Layer 2 switchport that carries traffic for only a single VLAN. This type of port is a Layer
2 interface only.

For more information on access ports, see the “Information About Access and Trunk Interfaces” section.

A routed port is a Layer 3 interface that you configure on a physical switch port (not a virtual interface). It
routes IP traffic to another device.

For more information on routed ports, see the Routed Interfaces section.

Management interface

A management interface is a network interface that

• provides dedicated connectivity for device administration,

• operates independently from data traffic interfaces, and

• supports remote access protocols such as Telnet and SNMP.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

6

Overview

Port-Channel interfaces

You use the management interface (commonly labeled as mgmt0) to detect connection types automatically.
It supports full-duplex mode and operates at speeds of 10, 100, or 1000 Megabits per second.

For more information on the management interface, see the Cisco Nexus 9000 Series NX-OS Fundamentals
Configuration Guide.

Port-Channel interfaces

A port-channel interface is a logical network interface that

• aggregates multiple physical interfaces into a single channel,

• increases bandwidth and enhances redundancy, and

• supports up to 32 bundled Ethernet links.

You can bundle up to 32 individual links (physical ports) into a port channel to improve bandwidth and
redundancy.

For more information about port-channel interfaces, see the Configuring Port Channels section.

Subinterfaces

A subinterface is a virtual interface that

• operates under a parent physical or port-channel interface,

• allows assignment of unique Layer 3 parameters such as IP addresses and routing protocols, and

• enables division of a single physical interface into multiple, independently configured virtual interfaces.

You can create virtual subinterfaces by configuring a parent interface as a Layer 3 interface.

Loopback interfaces

A loopback interface is a virtual network interface that

• has a single endpoint and is always operational,

• immediately receives any packet it transmits, and

• emulates the behavior of a physical interface without connecting to external devices.

Loopback interfaces are often used for testing, diagnostics, or internal routing purposes, as they guarantee the
interface remains active regardless of hardware state. For more information about subinterfaces, see the
Loopback Interfaces section.

Breakout interfaces

A breakout interface is a high-speed network port feature that

• splits a single high-bandwidth physical port into multiple lower-speed logical interfaces,

• enables a switch or router to connect to several lower-speed devices simultaneously, and

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

7

Module level breakouts on ports

Overview

• maximizes port utilization by allowing flexibility in network configuration.

Cisco NX-OS supports the breakout of a high-bandwidth interface into one or more low bandwidth interfaces
at the module level or at the per-port level.

Module level breakouts on ports

Lane Selectors

A module-level breakout is a port configuration technique that

• enables splitting of certain high-density ports into multiple lower-bandwidth ports,

• provides increased network configuration flexibility, and

• supports a range of port breakdown options such as 4x10G, 4x25G, 4x50G, etc.

You can configure the interface breakout command to split a high bandwidth interface of a module into
multiple lower speed ports.

Some modules break down all the ports into 4x10G, 4x25G, 4x50G, 4x100G, 2x50G, or 2x100G configurations.

Example: Module level breakout

For example, a module level breakout of 4x10G splits a 40G interface into four 10G interfaces. When you
execute the command, the module reloads and removes the existing interface configurations.

switch# configure terminal
switch(config)# interface breakout module 1
Module will be reloaded. Are you sure you want to continue(yes/no)? yes

To undo a breakout, use the no interface breakout module module_number command. This restores ports
to their original configuration and deletes previous breakout configurations.

A lane selector is a control panel feature that

• consists of a push-button switch and four LEDs,

• enables users to view the link or activity status of switch ports, and

• supports switching between 1 x 40G and 4 x 10G configurations on compatible Cisco Nexus 9000 Series

switches and the Cisco Nexus 3164 and 3232 switches.

Additional information

Lane selectors are located on the left side of the Cisco Nexus switch front panel and are labeled 'LS'.

When used in a 1 x 40G configuration, LEDs indicate the link/activity status of the main port. When configured
for 4 x 10G, pressing the push button cycles the LEDs through the status of each 10G port. On the last press,
all LEDs extinguish, and the display resets to the default mode.

By pressing the lane selector push button, the port LED shows the selected lane’s link/activity status.

The first time the push button is pressed, the first LED displays the status of the first port. Pressing the push
button a second time displays the status of the second port, and so on. To display the status of each of the four
ports, press the push button as described.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

8

Overview

Breakout port support on Cisco Nexus switches

When you press the push button after displaying the status of the last port, all four LEDs extinguish, indicating
that the lane selector has returned to display the status for the default 1 x 40G configuration.

Examples

If port 60 is configured as 4 x 10G, pressing the lane selector once displays the link status of 60/1/1, twice
for 60/1/2, and so on.

Note

The lane selector does not manage ports not configured for link/activity monitoring.

Guidelines

When a port is in 10G breakout mode and no lane is selected, the 40G port's LED lights green, even if only
one of the 10G breakout ports is up.

A 10G breakout port's LED blinks when the beacon feature has been configured for it.

Breakout port support on Cisco Nexus switches

The matrix provides detailed information about supported breakout modes (for example, 4x10G, 4x25G,
2x50G, etc.) for Cisco Nexus switches and line card platforms. For more information, see Cisco Nexus Data
Sheets.

Table3:BreakoutModesSupportMatrix

Switches

4x10G

4x25G

2x50G

2x100G

2x200G

2x400G

4x50G

4x100G

8x100G

Yes

Yes

Yes

No

No

No

No

No

No

Nexus 9300-FX3
Platform Switches

N9K-C93108TC-FX3

N9K-C93108TC-FX3P

N9K-C93180YC-FX3

N9K-C9348GC-FX3

N9K-C9348GC-FX3P

N9K-C9364C-H1

Yes

Yes

N9K-C93400LD-H1

Yes

Yes

N9K-C9332D-H2R

Yes

Yes

N9K-X9736C-FX3

Yes

Yes

N9K-X9636C-RX

Yes

Yes

N9K-X9636C-R

Yes

Yes

N9K-X9636Q-R

N9K-X96136YC-R

Yes

No

No

No

Yes

Yes

Yes

Yes

Yes

Yes

No

No

No

Yes

Yes

No

No

No

No

No

No

Yes

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

Yes

No

No

No

No

No

No

Yes

Yes

No

No

No

No

No

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

No

No

No

No

No

No

No

No

9

Breakout port support on Cisco Nexus switches

Overview

Switches

4x10G

4x25G

2x50G

2x100G

2x200G

2x400G

4x50G

4x100G

8x100G

N3K-C3636C-R

Yes

Yes

N3K-C36180YC-R

Yes

Yes

N9K-93108TC-FX3P

Yes

Yes

N9K-93108TC-EX

Yes

Yes

N9K-93180YC-EX

Yes

Yes

N9K-93108TC-FX

Yes

Yes

N9K-93180YC-FX

Yes

Yes

N9K-9348GC-FXP

Yes

Yes

N9K-X9736C-FX

Yes

Yes

N9K-X9736Q-FX

Yes

No

N9K-X9788TC-FX

Yes

Yes

N9K-X9732C-FX

Yes

Yes

N9K-C9348GC-FXP

Yes

Yes

N9K-C9336C-FX2

Yes

Yes

N9K-C93216TC-FX2

Yes

Yes

N9K-C93360YC-FX2

Yes

Yes

N9K-C9364C-GX

Yes

Yes

N9K-C9316D-GX

Yes

Yes

N9K-C93600CD-GX

Yes

Yes

N9K-X9716D-GX

Yes

Yes

N9K-C9364D-GX2A

Yes

Yes

N9K-C9332D-GX2B

Yes

Yes

N9K-C9348D-GX2A

Yes

Yes

N9K-X9400-16W

Yes

Yes

N9K-X9400-8D

Yes

Yes

N9K-X98900CD-A

Yes

Yes

N9K-X9836DM-A

Yes

Yes

N9364E-SG2-Q

No

No

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

Yes

Yes

Yes

Yes

Yes

No

Yes

Yes

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

Yes

Yes

Yes

Yes

Yes

No

Yes

Yes

Yes

Yes

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

No

Yes

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

10

Overview

Best practices for manual breakout configuration

Guidelines and limitations for breakout ports

• The Cisco Nexus 9516 switch does not support breakout on Modules 8 to 16.

• Starting with Cisco NX-OS Release 7.0(3)F2(1), the 36-port 100-Gigabit Ethernet QSFP28 line cards
(N9K-X9636C-R) and the 36-port 40-Gigabit Ethernet QSFP+ line cards (N9K-X9636Q-R) support
breakout to 4 x 10G.

• Starting with Cisco NX-OS Release 9.2(1), the N9K-9636C-R, N9K-X9636Q-R, and N9K-X9636C-RX

line cards support breaking out 40G ports into 4 x 10G.

• Starting with Cisco NX-OS Release 9.2(2), N9K-X9636C-R and N9K-X9636C-RX line cards support

break out of 100G ports into 4 x 25G. The N9K-C9636C-R does not support RS-FEC.

Starting with Cisco NX-OS Release 9.3(3), the default FEC mode on N9K-X9636C-R and
N9K-X9636C-RX is FC-FEC for 25G x 4 and 50G x 2.

When connecting N9K-X9636C-RX to N9K-X9636C-R, configure FC-FEC on N9K-X9636C-RX
because RS-FEC is not supported.

The N9K-X96136YC-R line card does not support breakout.

• Starting with Cisco NX-OS Release 9.3(3), these switches support breakout.

The Cisco Nexus 93600CD-GX switch and the Cisco Nexus 9500 R-Series switches support breaking
out 100G ports into 2 x 50G.

On Nexus 9500 R-Series switches with N9K-X9636C-R and N9K-X9636C-RX line cards, only specific
optics (QSFP-100G-PSM4-S, QSFP-100G-AOC, QSFP-100G-CU1M, and CU3M) support 2 x 50G and
4 x 25G breakout.

For more information see Cisco Optics-to-Device Compatibility Matrix.

• Starting with Cisco NX-OS Release 10.4(3), the Cisco N9K-X98900CD-A switch supports breakout on

4 x 25G port.

In releases prior to Cisco NX-OS Release 10.4(3), breakout is not supported on 4 x 25G port.

Best practices for manual breakout configuration

You must use the interface breakout module module number port port range map breakout mapping
command when performing manual breakout on Cisco Nexus devices.

• When you upgrade a Cisco Nexus 9000 device to Cisco NX-OS Release 7.0(3)I7(2) or later, interfaces
configured with manual breakout using a QSA are no longer supported. You must remove the configuration
and manually reconfigure the breakout settings for the affected interface.

Note

As of Cisco NX-OS Release 7.0(3)I7(2), manual breakout of QSA ports is not
supported.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

11

Best practices for manual breakout configuration

Overview

Note

This restriction does not apply to the following platforms, where manual breakout
remains fully supported—N9K-C93128TX, N9K-9332, N9K-C9396PX,
N9K-C9396TX, N9K-C9372PX, N9K-C9372TX, N9K-C9332PQ, N9K-9432PQ,
N9K-9536PQ, N9K-9636PQ, N9K-X9632PC-QSFP100, N9K-X9432C-S,
N3K-C3132Q-V, N3K-C3164Q, N3K-C3132C, N3K-C3232C, N3K-C3264Q,
N3K-C3264C, N3K-3064Q, N3K-3016, N3K-3172—because manual breakout
is supported on these platforms.

• Manual breakout is supported on the following platforms because auto-breakout does not does not occur
successfully on them—N9K-C93128TX, N9K-9332, N9K-C9396PX, N9K-C9396TX, N9K-C9372PX,
N9K-C9372TX, N9K-C9332PQ, N9K-C93120TX, N9K-9432PQ, N9K-9536PQ, N9K-9636PQ,
N9K-X9632PC-QSFP100, N9K-X9432C-S, N3K-C3132Q-V, N3K-C3164Q, N3K-C3132C,
N3K-C3232C, N3K-C3264Q, N3K-C3264C, N3K-3064Q, N3K-3016, N3K-3172.

Forward error correction (FEC) settings for breakout ports

FEC is required on all cable types except for 1-meter and 2-meter passive copper cables. Cisco switches use
FC-FEC CL74 by default. You can configure RS-FEC Consortium 1.6, RS-FEC IEEE, and other FEC
algorithms.

Note

Auto-FEC is not supported in Cisco NX-OS Release 7.0(3)I7(x)

When configuring a break-out port, ensure that the FEC is matching for the link to be up.

There are two primary FEC algorithms used in 25G Ethernet.

•

•

FC-FEC (also known as "FireCode," "BASE-R," or "Clause 74") provides low-latency error
protection (under 100 nanoseconds) optimized for bursty error correction. It is used on 3- and 5-meter
passive copper cables, as well as on active optical 25G cables up to 10 meters in length. This FEC
type is also utilized across all 100G interfaces.

• RS-FEC (also referred to as "Reed Solomon," "Clause 91," or "Clause 108") offers better error

protection. It is required for 25G multimode fiber (MMF) transceivers, such as Cisco SFP-25G-SR-S,
supporting distances up to 100 meters. RS-FEC may also be necessary for active optical cables
exceeding 10 meters.

All 25G devices support FC-FEC by default. The Cisco Nexus 9300-FX series supports RS-FEC.

Beginning with Cisco NX-OS Release 7.0(3)I7(3,) there are two additional options to configure FEC
such as rs-cons16 and rs-ieee as per IEEE standards.

Enable the RS FEC IEEE (25G) using the fec rs-ieee command on Cisco Nexus 9000 switches to
implement RS-FEC error correction on high-speed Ethernet interfaces.

switch# (config-if)# fec ?
auto FEC auto
fc-fec CL74(25/50G)off Turn FEC off
rs-cons16 RS FEC Consortium 1.6 (25G)
rs-fec CL91(100G) or Consortium 1.5 (25/50G)
rs-ieee RS FEC IEEE (25G)

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

12

Overview

Breakout modes on Cisco Nexus C9364C-H1 switch

• Beginning with Cisco NX-OS Release 7.0(3)I7(7), you can display the admin and operational status of

FEC interface information with the show interface fec command.

Example:

switch# show interface fec
---------------------------------------------------------------------------------------------------
Name Ifindex Admin-fec Oper-fec
---------------------------------------------------------------------------------------------------
Eth1/1
Eth1/2
Eth1/3/1 0x38014000 auto auto disabled auto QSFP-H40G-AOC3M
Eth1/3/2 0x38015000 auto auto disabled auto QSFP-H40G-AOC3M
Eth1/3/3 0x38016000 auto auto disabled auto QSFP-H40G-AOC3M
Eth1/3/4 0x38017000 auto auto disabled auto QSFP-H40G-AOC3M

0x1a000000 auto auto connected
0x1a000200

10G SFP-H10GB-AOC2M

auto QSFP-100G-AOC3M

Status Speed Type

notconneced

Rs-fec

Breakout modes on Cisco Nexus C9364C-H1 switch

Starting with Cisco NX-OS Release 10.5(3)F, the Cisco Nexus C9364C-H1 switch supports breakout mode.

Breakout modes are port configuration settings on the Cisco Nexus C9364C-H1 switch that

• allow a single port to be split into multiple logical interfaces (such as 2x50G, 4x25G, or 4x10G),

• are available only on the first port of every front port quad grouping (e.g., ports 1, 5, 9, ...).

Note

During breakout of the interface, the three adjacent front ports are removed, and
are not visible in the interface verification or configuration commands.

Cisco Nexus 9000 C93180LC-EX switch - Operation and breakout modes

Operation and breakout modes are switch configuration profiles. These profiles let you group and set ports,
split high-speed physical ports into multiple lower-speed logical ports, and find out which types of equipment
and cabling you can use for each mode.

Cisco Nexus 9000 C93180LC-EX modes

Operation modes are switch configuration profiles that

• determine available bandwidth and port groupings

• enable different breakout capabilities, and

• require you to use distinct configuration procedures to switch between modes.

The Cisco Nexus 9000 C93180LC-EX switch supports three operation modes (7.0(3)I7(1) and later):

• Mode 1: 28 x 40G + 4 x 40G/100G (Default configuration)

This is a hardware profile port mode 4x100G + 28x40G ports. It supports:

• Breakout support of 10 x 4 on top ports from 1 to 27 (ports 1,3,5, 7...27).

If you break out any of the top ports, the corresponding bottom port becomes non-operational.

For example, if port 1 is broken out, port 2 becomes non-operational.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

13

Cisco Nexus 9000 C93180LC-EX switch - Operation and breakout modes

Overview

• 1 Gigabit and 10 Gigabit QSA support on ports 29, 30, 31, and 32. However, QSAs on the top and

bottom front panel ports must be of same speed.

• Breakout support of 10 x 4, 25 x 4, and 50 x 2 on ports 29, 30, 31, and 32.

• Mode 2: 24 x 40G + 6 x 40G/100G

This hardware profile port mode 6 x 100G + 24 x 40G ports. It supports:

• Breakout support of 10 x 4 on top ports from 1 to 23 (ports 1,3,5, 7...23). If any of the top port is

broken out the corresponding bottom port becomes non-operational.

• Breakout support of 10 x 4, 25 x 4, and 50 x 2 on ports 25, 27, 29, 30, 31, and 32.

• 1 Gigabit and 10 Gigabit QSA support on ports 29, 30, 31, and 32. However, QSAs on the top and

bottom front panel ports must be of same speed.

• Mode 3: 18 x 40G/100G

This hardware profile port mode 18 x 100G that ports. It supports:

• Breakout support of 10 x 4, 25 x 4, and 50 x 2 on top ports from 1 to 27 (ports 1,3,5, 7...27) and on

ports 29,30,31,32.

• 1 Gigabit and 10 Gigabit QSA on all the 18 ports.

To change from Mode 3 to another mode, enter the copy running-config startup-config command followed
by reload command to take effect. However, to move between Modes 1 and 2, you only need to enter the
copy running-config startup-config command.

Use the show running-config | grep portmode command to display the current operation mode.

switch(config-if-range)# show running-config | grep portmode

hardware profile portmode 4x100G+28x40G

Breakout modes

The Cisco Nexus C93180LC-EX switch has three breakout modes.

• Support for 40G to 4 x 10G breakout ports

• This mode enables the breakout of 40G ports into 4 x 10G ports.

• To configure this mode, use the interface breakout module 1 port x map 10g-4x command.

• Support for 100G to 4 x 25G breakout ports

• This mode enables the breakout of 100G ports into 4 x 25G ports.

• To configure this mode, use the interface breakout module 1 port x map 25g-4x command.

• Support for 100G to 2 x 50G breakout ports

• This mode enables the breakout of 100G ports into 2 x 50G ports.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

14

Overview

Breakout considerations for Cisco Nexus 9000 C9364C-GX switch

• To configure this mode, use the interface breakout module 1 port x map 50g-2x command.

Breakout considerations for Cisco Nexus 9000 C9364C-GX switch

hese are breakout considerations for Cisco Nexus N9K-C9364C-GX switches.

• Configure breakout modes—1-64, 2 x 50G, 4 x 25G, and 4 x 10G —only on odd-numbered ports.

Note

Do not attempt break out on even-numbered ports.

• When you break out an odd-numbered port, even-numbered ports in that quad are automatically removed,

and the other odd port is configured to the same breakout speed.

For example, if port 1 or port 3 is broken out into 2 x 50, 4 x 25G or 4 x 10G, then the other odd port in
that quad is automatically set to the same speed and ports 2 and 4 in that quad are removed. All ports in
that quad revert to default when this breakout configuration is removed.

• To revert a quad to default port status, remove the breakout configuration from both odd ports in the

quad.

• QSFP28 (100G) transceivers support the 4 x 25G breakout feature. Beginning Cisco NX-OS Release

9.3(5), the 2 x 50G breakout feature is supported.

• QSFP+ (40G) transceivers support the 4 x 10G breakout feature.

• Use the interface breakout module 1 port x map 50g-2x command to enable the breakout of 100G

ports into 2 x 50G ports on all odd ports.

• Use the interface breakout module 1 port x map 10g-4x command to enable the breakout the breakout

of 40G ports into 4 x 10G ports.

Breakout features on Cisco Nexus 9000 C93600CD-GX switches

Use the breakout considerations on the Cisco Nexus N9K-C93600CD-GX.

• In Cisco Nexus N9K-C93600CD-GX, every four ports from 1 through 24 are referred to as a quad.

Note

The breakout configuration and the speed must be the same within a quad.

The breakout feature may not function as expected if there is a mismatch of speed
or breakout configuration within a quad.

The six quads consist of ports 1–4, 5–8, 9–12, 13–16, 17–20, and 21–24.

• Beginning Cisco NX-OS Release 9.3(5), 2 x 50G breakout feature is supported on ports 1-36.

• 4 x 25G and 4 x 10G breakout features are supported only on odd ports, between ports 1 through 24. The

even ports within a quad are removed (four ports).

• When an odd-numbered port in a quad is broken out, the even ports in that quad are removed and the

other odd ports within the quad is broken out automatically broken out to the same speed.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

15

Breakout considerations on Cisco Nexus C9316D-GX switches

Overview

For example, if port 1 is broken out into 4 x 25G or 4 x 10G, the other odd ports within the quad are
automatically broken out to the same speed, and ports 2 and 4 in that quad are removed. When this
breakout configuration is removed, all ports in that quad revert to the default configuration.

• 2 x 50G breakout is supported on all ports from 1 through 24. All ports in a quad are broken out

automatically to the same speed when one port in the quad is broken out to 2 x 50G.

For example, when Port 2 is broken out into 2 x 50G, ports 1, 3, and 4 are automatically broken out into
2 x 50G.

Note

Only RS-FEC is supported on both lanes for 50G speed on ports 1 through 24.

• Beginning with Cisco NX-OS Release 9.3(3), ports 25-28 support 4 x 10G, 4 x 25G, and 2 x 50G breakout

features. These breakout features are supported in port pairs, for example 25-26 and 27-28.

Note

Lane 2 of 2 x 50G should be configured with RS-FEC for the link to be up.

• Beginning with Cisco NX-OS Release 9.3(3), ports 29-36 support these breakout configurations.

• QSFP-DD-400G-DR4 transceivers support only the 4 x 100G breakout feature.

• QSFP-DD-400G-FR4 and QSFP-DD-400G-LR8 transceivers do not support the breakout features.

• QSFP28 (100G) transceivers support 2 x 50G and 4 x 25G breakout features.

• QSFP+ (40G) transceivers support 4 x 10G breakout features.

Breakout considerations on Cisco Nexus C9316D-GX switches

Use these breakout considerations for ports 1 through 16 on the Cisco Nexus N9K-C9316D-GX switch.

• QSFP-DD-400G-DR4 transceivers support only the 4 x 100G and 4 x 10G breakout features.

Note

QSFP-DD-400G-FR4 and QSFP-DD-400G-LR8 transceivers do not support the
breakout features.

• QSFP28 (100G) transceivers support the 2 x 50G, 4 x 25G, and 4 x 10G breakout feature.

Breakout considerations on Cisco Nexus 93C64E-SG2-Q switch

You can use the breakout feature, a switch port capability that allows a single high-speed port to be divided
into multiple lower-speed ports for flexible connectivity.

Starting with Cisco NX-OS Release 10.5(3)F, the Cisco Nexus 93C64E-SG2-Q switch provides

• breakout configurations of 2x400G and 8x100G,

• compatibility with supported optics, and

• flexible port configuration.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

16

Overview

Virtual device contexts

The supported breakout modes include:

• 2x400G breakout: Divide a single port into two 400G ports.

• 8x100G breakout: Divide a single port into eight 100G ports.

Optics

Beginning with Cisco NX-OS Release 10.5(3)F, the Cisco Nexus 93C64E-SG2-Q switch supports these
optics.

• QDD-8X100G-FR

• QDD-8x100G-LR

• QDD-2X400G-FR4

• QDD-2x400G-LR4

The Cisco Nexus 93C64E-SG2-Q switch also supports 64 QSFP-DD800 ports. This enables high-density and
high-speed connectivity.

Virtual device contexts

A virtual device context (VDC) is a network virtualization technology that

• segments operating system and hardware resources,

• emulates independent logical switches within a physical switch, and

• allows separate configuration, administration, and management for each context.

The Cisco Nexus 9000 Series switch does not support multiple VDCs. All switch resources are managed in
the default VDC.

High availability for interfaces

High availability for interfaces is a network feature that

• enables interfaces to continue operating during supervisor switchovers, and

• supports both stateful and stateless restart mechanisms.

A stateful restart occurs on a supervisor switchover. After the switchover, Cisco NX-OS applies the runtime
configuration.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

17

High availability for interfaces

Overview

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

18

