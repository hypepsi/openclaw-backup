# Chapter 3


Configuring Basic Interface Parameters

• About the Basic Interface Parameters, on page 19
• Best practices and limitations for interface configuration, on page 33
• Retimer ports, on page 40
• Default settings for interface parameters, on page 42
• Configure the basic interface parameters, on page 42
• Commands for viewing basic interface parameters, on page 81
• Monitor interface counters, on page 82
• Example: Configuring QSA on Cisco Nexus 9396PX switch, on page 84

About the Basic Interface Parameters

Interface descriptions

An interface description is a configuration attribute that

• assigns a recognizable name to an Ethernet or management interface,

• enables quick identification of the interface in listings with multiple interfaces, and

• allows unique labeling to distinguish individual interface roles or purposes.

To set the description parameter for a port-channel interface, see the “Configuring a Port-Channel Description”
section.

To set the description parameter for other interfaces, see the “Configuring the Description” section.

Beacon mode

Beacon mode is a port identification feature that

• activates the port’s link-state LED to flash green for identification,

• is disabled by default, and

• is enabled by setting the beacon parameter on an interface.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

19

Error-disabled states

Configuring Basic Interface Parameters

You can use beacon mode to easily locate a physical port on a device during installation or troubleshooting.
When activated, the corresponding port's LED flashes green, indicating the exact interface. This simplifies
tasks such as cable tracing or port verification in complex environments.

To identify the physical port for an interface, activate the beacon parameter for the interface.

For information on configuring the beacon parameter, see “Configuring the Beacon Mode” section.

Error-disabled states

An error-disabled state is an operational port state that

• occurs when a port is administratively enabled, but disabled at runtime due to a detected problem,

• results from automated protection mechanisms (such as UDLD detecting unidirectional links or excessive

port flapping), and

• requires manual intervention or specific recovery configuration to restore normal operation.

Additional information

A port enters the error-disabled (err-disabled) state when it is enabled administratively using the no shutdown
command, but is disabled at runtime by any process.

When an interface is in the err-disabled state, use the show interface status err-disabled command to find
information about the error.

For example, if UDLD detects a unidirectional link, the port is shut down at runtime. However, because the
port is administratively enabled, the port status displays as err-disable.

Once a port goes into the err-disable state, you must manually reenable it or you can configure a timeout value
that provides an automatic recovery.

Note

By default, the automatic recovery is not configured, and the err-disable detection is enabled for all causes.

Automatic error-disabled recovery

You can configure the automatic error-disabled recovery timeout for a particular error-disabled cause and
configure the recovery period.

The errdisable recovery cause command provides an automatic recovery after 300 seconds.

You can use the errdisable recovery interval command to change the recovery period within a range of
30 to 65535 seconds. You can also configure the recovery timeout for a particular err-disable cause.

If error-disabled recovery is not enabled for the cause, the interface remains in error-disabled state until you
enter the shutdown and no shutdown commands.

If the recovery is enabled for a cause, the interface is brought out of the error-disabled state and allowed to
retry operation once all the causes have timed out.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

20

Configuring Basic Interface Parameters

MDIX parameters

Guidelines

• Embedded Event Manager (EEM) policy error-disables a port after 30 flaps in 420 consecutive seconds

(7 minutes) to detect faulty cables and optics (by default) .

Starting with Cisco NX-OS Release 10.5(2)F, ports are error-disabled after 25 flaps within 420 seconds
for systems that need startup and shutdown time. This is applicable to these platforms.

• Cisco Nexus 9800 Series Switches

• N9K-C9332D-GX2B

• N9K-C9364D-GX2A

• N9K-C9348D-GX2A

• N9K-C9408

MDIX parameters

A medium-dependent interface crossover (MDIX) parameter is an interface configuration setting that

• enables or disables automatic detection of crossover connections between network devices,

• applies only to copper network interfaces, and

• defaults to enabled status, ensuring compatibility without manual wiring considerations.

The no mdix auto command is supported only on , N9K-C93108TC-FX, N9K-X9788TC-FX, and
N9K-C9348GC-FXP devices.

Note

MDIX is not supported on Nexus N9396T12C-SE1 in Cisco NX-OS Release 10.6(2)F.

For information about configuring the MDIX parameter, see the Configuring the MDIX Parameter section.

Interface status error policies

An interface status error policy is a network policy enforcement mechanism that

• prevents interfaces from being activated if a policy push fails,

• stores error state information to avoid repeated disruptions, and

• ensures policy and hardware configuration consistency.

Cisco NX-OS policy servers, such as Access Control List (ACL) Manager and Quality of Service (QoS)
Manager, maintain a policy database where each policy is defined through the command-line interface.

When you configure an interface with a policy, the system ensures that the policy matches the hardware
policies. If a policy is pushed that does not match hardware policy, the interface is set to an error-disabled
policy state. The error state persists and information is stored to prevent the port from being brought up in the
future, avoiding repeated policy violations and system disruption.

To clear the error and retry the programming, use the no shutdown command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

21

Interface MTU sizes

Interface MTU sizes

Configuring Basic Interface Parameters

A maximum transmission unit (MTU) size is a network interface parameter that

• determines the largest frame size an Ethernet port can process,

• enforces the drop of frames exceeding the configured size.

Additional information

By default, each interface uses an MTU of 1500 bytes, matching the IEEE 802.3 standard for Ethernet frames.

Larger MTU sizes, called jumbo frames, improve processing efficiency. Jumbo frames are typically up to
9216 bytes.

Cisco NX-OS platforms allow MTU adjustment per interface or at different levels in the protocol stack.

CloudScale switches allow an extra 166 bytes above the configured MTU (by default) to accommodate
additional encapsulations in hardware.

Note

For transmissions to occur between two ports, you must configure the same MTU size for both ports. A port
drops any frames that exceed its MTU size.

MTU configuration by interface type

MTU is configured per interface. An interface can be a Layer 2 or a Layer 3 interface.

• Layer 2 interfaces

You can configure the MTU size with one of two values: the system default MTU value or the system
jumbo MTU value.

The system default MTU value is 1500 bytes. Each Layer 2 interface uses this value by default. You can
configure an interface with the default system jumbo MTU value, that is 9216 bytes.

To allow an MTU value from 1500 through 9216, first set the system jumbo MTU. Then, align interface
MTUs accordingly.

Note

You can change the system jumbo MTU size. When the value is changed, the
Layer 2 interfaces that use the system jumbo MTU value, automatically changes
to the new system jumbo MTU value.

• Layer 3 interfaces

Layer 3 interfaces include the Layer 3 physical interface (configured with no switchport), switch virtual
interface (SVI), and sub-interface. You can configure their MTU size between 576 and 9216 bytes.

For information about setting the MTU size, see the Configuring the MTU Size section.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

22

Configuring Basic Interface Parameters

Bandwidth

Bandwidth

Guidelines

• If you configure an ingress interface with an MTU less than 9216 on Cisco Nexus 9300-FX2 and 9300-GX
devices, FTE does not capture input errors or display events. If you set the ingress MTU to 9216, FTE
displays all events.

Bandwidth is a network performance metric that

• measures the maximum data transfer rate of a network connection,

• defines the capacity of a link between devices, and

• remains fixed at the physical layer for Ethernet ports (for example, 1,000,000 Kb).

On Ethernet ports, the physical bandwidth is always fixed (such as 1,000,000 Kb). Layer 3 protocols use a
configurable bandwidth value solely for internal metric calculations. Modifying this parameter affects only
the routing protocol’s behavior and does not physically alter the connection’s capacity.

For example, the Enhanced Interior Gateway Routing Protocol (EIGRP) uses the minimum path bandwidth
to determine a routing metric, but the bandwidth at the physical layer remains at 1,000,000 Kb.

For information about configuring the bandwidth parameter, see the Configuring the Bandwidth.

Throughput-delayp values

Throughput-delay is an interface configuration parameter that

• provides a value used by Layer 3 protocols to make operating decisions,

• does not affect the actual throughput delay of an interface, and

• is specified in tens of microseconds.

For example, the Enhanced Interior Gateway Routing Protocol (EIGRP) can use the delay setting to set a
preference for one Ethernet link over another, if other parameters such as link speed are equal. The delay
value is specified in the tens of microseconds.

For information on configuring the throughput-delay parameter for other interfaces, see Configuring the
Throughput Delay.

Administrative status parameters

An administrative status parameter is a network interface setting that:

• indicates whether an interface is administratively up or down,

• enables or disables the ability of the interface to transmit data.

When the administrative status is set to down, the interface is disabled and cannot transmit data. When set to
up, the interface is enabled.

For information about configuring the administrative status parameter for port-channel interfaces, see the
“Shutting Down and Restarting the Port-Channel Interface” section.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

23

Unidirectional Link Detection

Configuring Basic Interface Parameters

For information about configuring the administrative status parameter for other interfaces, see the “Shutting
Down and Activating the Interface” section.

Unidirectional Link Detection

UDLD

Unidirectional Link Detection (UDLD) is a network protocol that

• monitors the physical configuration of fiber and copper Ethernet cables between connected devices,

• detects the presence of unidirectional links on these connections, and

• automatically shuts down affected LAN ports to prevent network problems.

UDLD is a Cisco-proprietary protocol designed to identify and mitigate issues that occur when traffic passes
in only one direction on a connection—known as a unidirectional link. Such conditions can create network
loops and cause data loss or protocol malfunctions.

The Cisco Nexus 9000 Series device periodically transmits UDLD frames to neighbor devices on LAN ports
with UDLD enabled. If the frames are echoed back within a specific time frame but lack an acknowledgment
(echo), the link is flagged as unidirectional. The LAN port is then shut down.

Both ends of the link must support UDLD for the protocol to identify and disable unidirectional links. You
can configure the transmission interval for the UDLD frames globally or for the specified interfaces.

UDLD performs tasks that autonegotiation cannot perform, such as detecting the identities of neighbors and
shutting down misconnected LAN ports.

When you enable both autonegotiation and UDLD, Layer 1 detections work to prevent physical and logical
unidirectional connections and the malfunctioning of other protocols.

A unidirectional link occurs when traffic sent by the local device is received by the neighbor, but traffic from
the neighbor is not received by the local device.

If one of the fiber strands in a pair is disconnected and autonegotiation is active, the link does not remain up.
In this case, the logical link is undetermined, and UDLD does not take any action. If both fibers work normally
at Layer 1, UDLD checks whether they are connected correctly and whether traffic flows bidirectionally
between the correct neighbors. This check cannot be performed by autonegotiation, because autonegotiation
operates at Layer 1.

Note

By default, UDLD is locally disabled on copper LAN ports to avoid sending unnecessary control traffic on
this type of media.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

24

Configuring Basic Interface Parameters

Default UDLD configuration states

Note

Beginning with Cisco NX-OS Release 10.6(2)F, Unidirectional Link Detection (UDLD) feature is supported
on the following Cisco Nexus platform switches:

• N9K-X9836DM-A

• N9K-X98900CD-A

• N9336C-SE1

• N9396Y12C-SE1

• N9396T12C-SE1

• N9324C-SE1U

• N9348Y2C6D-SE1U

Example

Device A and Device B are connected with fiber-optic cables. Due to a cable break, Device B can receive
traffic from Device A, but Device A cannot receive traffic from Device B. UDLD detects this unidirectional
condition and disables the affected port, preventing network issues.

Figure1:UnidirectionalLink

Analogy

UDLD is like a two-way conversation in which both participants regularly confirm they can hear each other.
If one participant stops responding, the conversation is paused to prevent misunderstandings—just as UDLD
disables a port if bidirectional communication fails.

Default UDLD configuration states

UDLD configuration state is a system-defined setting that

• specifies whether UDLD operates globally or on specific ports,

• determines if UDLD runs in standard or aggressive mode, and

• controls the message interval for UDLD protocol operation.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

25

UDLD normal and aggressive modes

Configuring Basic Interface Parameters

UDLD applies different defaults depending on port media type.

• On Ethernet fiber-optic ports, UDLD is enabled by default.

• On Ethernet twisted-pair (copper) ports, UDLD is disabled by default. You must enable UDLD if you

want to use it.

UDLD default configuration states

The table shows the default UDLD configuration.

Table4:UDLDdefaultconfigurationstates

Feature

UDLD global enable state

Default Value

Globally disabled

UDLD per-port enable state for fiber-optic media

Enabled on all Ethernet fiber-optic LAN ports

UDLD per-port enable state for twisted-pair (copper)
media

Disabled on all Ethernet 10/100 and 1000BASE-TX
LAN ports

UDLD aggressive mode

UDLD message interval

Disabled

15 seconds

For information about configuring the UDLD for the device and its port, see the “Configuring the UDLD
Mode” section.

UDLD normal and aggressive modes

The UDLD mode monitors links and determines how to detect and respond to unidirectional link failures.

You can use UDLD in normal mode or aggressive mode.

• Normal mode: UDLD normal mode exchanges packets between peers ports to detect link health.

• Aggressive mode: UDLD aggressive mode attempts to re-establish contact with an unresponsive neighbor.
If, after eight retries, the link remains unresponsive, UDLD aggressively disables the affected port to
prevent undetected one-way faults from causing network issues.

Additional information

When the switch detects link errors such as an empty echo packet, unidirectional failure, TX or RX loop, or
neighbor mismatch, it flags the condition but might not disable the port.

UDLD operates in normal mode by default, and aggressive mode is disabled unless you enable it.

When you enable UDLD aggressive mode globally, it activates on all fiber ports. You can also activate on a
specific individual fiber port.

Note

You must configure it on individual copper interfaces.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

26

Configuring Basic Interface Parameters

Port channels

Use UDLD aggressive mode only between network devices that both support it. Use this mode only on
point-to-point links.

In these scenarios, UDLD aggressive mode disables a port to prevent traffic loss.

• One side of a link has a stuck port (both transmission and receive)

• One side of a link remains up while the other side of the link is down

Guidelines

• If you upgrade a line card during an ISSU, and some ports are part of a Layer 2 port channel with UDLD

aggressive mode enabled, shutting down a remote port causes UDLD to place the local port in
error-disabled state. This is the expected behavior.

To restore service after the ISSU has completed, enter the shutdown command followed by the no
shutdown command on the local port.

Port channels

A port channel is a logical interface that

• combines multiple physical interfaces to increase aggregate bandwidth,

• provides redundancy by remaining operational as long as at least one member interface is active, and

• balances traffic across the participating physical interfaces to optimize network performance.

Port channeling also load balances traffic across these physical interfaces. The port channel remains operational
as long as at least one physical interface within the channel is active

Additional information

You can create Layer 3 port channels by bundling compatible Layer 3 interfaces.

Any configuration changes made to a port channel are automatically applied to each member interface within
that channel.

For information about port channels, see Chapter 6, "Configuring Port Channels".

Port Profiles

On Cisco Nexus 9300 Series switches, you can create a port profile that contains many interface commands
and apply that port profile to a range of interfaces. Each port profile can be applied only to a specific type of
interface; the choices are as follows:

• Ethernet

• VLAN network interface

• Port channel

When you choose Ethernet or port channel as the interface type, the port profile is in the default mode which
is Layer 3. Enter the switchport command to change the port profile to Layer 2 mode.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

27

Port Profiles

Configuring Basic Interface Parameters

You inherit the port profile when you attach the port profile to an interface or range of interfaces. When you
attach, or inherit, a port profile to an interface or range of interfaces, the system applies all the commands in
that port profile to the interfaces. Additionally, you can have one port profile inherit the settings from another
port profile. Inheriting another port profile allows the initial port profile to assume all of the commands of
the second, inherited, port profile that do not conflict with the initial port profile. Four levels of inheritance
are supported. The same port profile can be inherited by any number of port profiles.

The system applies the commands inherited by the interface or range of interfaces according to the following
guidelines:

• Commands that you enter under the interface mode take precedence over the port profile’s commands

if there is a conflict. However, the port profile retains that command in the port profile.

• The port profile’s commands take precedence over the default commands on the interface, unless the

port-profile command is explicitly overridden by the default command.

• When a range of interfaces inherits a second port profile, the commands of the initial port profile override

the commands of the second port profile if there is a conflict.

• After you inherit a port profile onto an interface or range of interfaces, you can override individual

configuration values by entering the new value at the interface configuration level. If you remove the
individual configuration values at the interface configuration level, the interface uses the values in the
port profile again.

• There are no default configurations associated with a port profile.

• On Cisco Nexus C9232E-B1 switch, the ports will be in 2x400G profile by default. To change to other
breakout mode, you must configure no interface breakout module 1 port <port#> map 400g-2x " and
then to "interface breakout module 1 port <port#> map <map name>.

A subset of commands are available under the port-profile configuration mode, depending on which interface
type you specify.

Note

You cannot use port profiles with Session Manager. See the Cisco Nexus 9000 Series NX-OS System
Management Configuration Guide for information about Session Manager.

To apply the port-profile configurations to the interfaces, you must enable the specific port profile. You can
configure and inherit a port profile onto a range of interfaces prior to enabling the port profile. You would
then enable that port profile for the configurations to take effect on the specified interfaces.

If you inherit one or more port profiles onto an original port profile, only the last inherited port profile must
be enabled; the system assumes that the underlying port profiles are enabled.

When you remove a port profile from a range of interfaces, the system undoes the configuration from the
interfaces first and then removes the port-profile link itself. Also, when you remove a port profile, the system
checks the interface configuration and either skips the port-profile commands that have been overridden by
directly entered interface commands or returns the command to the default value.

If you want to delete a port profile that has been inherited by other port profiles, you must remove the inheritance
before you can delete the port profile.

You can also choose a subset of interfaces from which to remove a port profile from among that group of
interfaces that you originally applied the profile. For example, if you configured a port profile and configured

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

28

Configuring Basic Interface Parameters

Cisco QSFP+ to SFP+ adapter modules

ten interfaces to inherit that port profile, you can remove the port profile from just some of the specified ten
interfaces. The port profile continues to operate on the remaining interfaces to which it is applied.

If you delete a specific configuration for a specified range of interfaces using the interface configuration mode,
that configuration is also deleted from the port profile for that range of interfaces only. For example, if you
have a channel group inside a port profile and you are in the interface configuration mode and you delete that
port channel, the specified port channel is also deleted from the port profile as well.

Just as in the device, you can enter a configuration for an object in port profiles without that object being
applied to interfaces yet. For example, you can configure a virtual routing and forward (VRF) instance without
it being applied to the system. If you then delete that VRF and related configurations from the port profile,
the system is unaffected.

After you inherit a port profile on an interface or range of interfaces and you delete a specific configuration
value, that port-profile configuration is not operative on the specified interfaces.

If you attempt to apply a port profile to the wrong type of interface, the system returns an error.

When you attempt to enable, inherit, or modify a port profile, the system creates a checkpoint. If the port-profile
configuration fails, the system rolls back to the prior configuration and returns an error. A port profile is never
only partially applied.

Cisco QSFP+ to SFP+ adapter modules

A Cisco QSFP+ to SFP+ adapter module (QSA) is a network interface accessory that

• enables the use of 10G SFP+ transceivers in 40G QSFP+ uplink ports,

• requires all ports in a designated speed group to operate at the same speed (either 10G or 40G).

The Cisco QSFP+ to SFP+ adapter (QSA) module enables 10G operation on 40G uplink ports within Cisco
Nexus M6PQ and M12PQ uplink modules, which belong to specific Cisco Nexus 9300 devices

To use QSA/QSFP modules, six consecutive ports in the M6PQ or M12PQ uplink module must operate at
the same speed—either 10G or 40G.

Supported platforms and port groups

These Cisco Nexus devices and port groups support the Cisco QSFP+ to SFP+ adapter module:

• Cisco Nexus 9396PX: 2/1–6 (first group), 2/7–12 (second group)

• Cisco Nexus 93128PX/TX: 2/1–6 (first group), 2/7–8 (second group)

• Cisco Nexus 937xPX/TX: 1/49–54 (only group)

• Cisco Nexus 93120TX: 1/97–102 (only group)

• Cisco Nexus 9332PQ: 1/27–32 (only group)

Configuring port speed for QSA modules

Use the speed-group 10000 command to configure the first port of a port speed group to set all ports in the
group to 10G. The default port speed is 40G.

The no speed-group 10000 command specifies a speed of 40G.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

29

Cisco SFP+ adapter modules

Configuring Basic Interface Parameters

• Do not remove uplink modules from a Cisco Nexus 9300 platform switch that runs Cisco NX-OS Release

7.0(3)I7(5). Use the ports on uplink modules for uplinks only

• Beginning with Cisco NX-OS Release 9.2(2), CWDM4 is supported on these line cards:

• 36-port 100-Gigabit Ethernet QSFP28 line cards (N9K-X9636C-R)

• 36-port 40-Gigabit Ethernet QSFP+ line cards (N9K-X9636Q-R),

• 36-port 100-Gigabit QSFP28 line cards (N9K-X9636C-RX)

• 52-port 100-Gigabit QSFP28 line cards (N9K-X96136YC-R)

After you configure the speed, the switch enables compatible transceiver modules. The switch disables
incompatible modules and displays the message 'check speed-group' config.

Note

The Cisco QSFP+ to SFP+ Adapter (QSA) module does not provide 10G support for the 40G line cards for
Cisco Nexus 9500 devices.

You can use a QSFP-to-SFP adapter on Cisco Nexus 9200 and 9300-EX Series switches and Cisco Nexus
3232C and 3264Q Series switches.

Cisco SFP+ adapter modules

A Cisco SFP+ adapter module is a network interface device that

• enables high-speed connectivity by adapting SFP+ optics for use in higher-capacity switch ports,

• supports multiple Ethernet speeds (such as 10G and 25G) with manual or automatic speed configuration.

The interface breakout module command enables you to split a 100G interface into four 25G interfaces.
After you enter this command, you must copy the running configuration to the startup configuration.

Beginning with Cisco NX-OS Release 9.2(3), 10/25 LR is supported on , N9K-X97160YC-EX,
N9K-C93180YC-FX, N9K-C93240YC-FX2 and N3K-C34180YC switches.

This dual speed optical transceiver operates at 25G by default and interoperates with other 25G LR transceivers.
Because auto speed sensing is not supported, to use this device with a 10G transceiver, configure it manually
for 10G speed.

The CVR-2QSFP28-8SFP adapter supports 25-Gigabit optics on 100-Gigabit ports of the Cisco Nexus 9236C
switch.

Cisco SFP-10G-T-X modules

A Cisco SFP-10G-T-X module is a hot-swappable, 10 Gigabit Ethernet transceiver that

• provides 10GBASE-T connectivity over standard Category 6a or 7 copper cabling,

• supports RJ-45 connectors for interface flexibility, and

• enables up to 30-meter reach for data center and enterprise applications.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

30

Configuring Basic Interface Parameters

Cisco SFP-10G-OLT20-X modules

Starting with Cisco NX-OS Release 9.3(5), 10G BASE-T SFP+ (RJ-45) is supported on N9K-C93240YC-FX2,
, N9K-C93180YC-FX and N9K-C93360YC-FX2 devices.

By default, Cisco SFP-10G-T-X modules operate at 10G speeds.

When using a SFP-10G-T-X module, all neighboring ports must be either empty or must use passive copper
links.

The show interface and show interface capability commands display supported speed for certain ports.

The switch may display 100 Mbps as a supported speed for certain ports when using the SFP-10G-T-X
transceiver. For GLC-TE transceivers, the lowest supported speed is 1 Gbps.

An interface configured with media-type 10G-TX, while in the admin up state, remains error-disabled when
using an unsupported media-type. To resolve this condition, enter these commands on the interface:

• shutdown

• no shutdown

The table shows the default port mapping for various Cisco Nexus switches.

Table5:DefaultPortMapping

Device Name

Port Map

Cisco Nexus , N9K-C93180YC-FX,
N9K-C93180YC-FX3 and N9K-C93180YC-FX3S

PI/PE: 1, 4-5, 8-9, 12-13, 16, 37, 40-41, 44-45, 48

Cisco Nexus N9K-C93240YC-FX2

W/ PI Fan/PS: 2, 6, 8, 12, 14, 18, 20, 24, 26, 30,

32, 36, 38, 42, 44, 48

W/ PE Fan/PS: 6, 12, 18, 24, 30, 36, 42, 48

Cisco Nexus N9K-C93360YC-FX2

PI/PE 1, 4-5, 8, 41, 44-45, 48-49, 52-53, 56-57,

60-61, 64-65, 68-69, 72-73, 76-77, 80-81, 84-85,

88-89, 92-93, 96

Cisco SFP-10G-OLT20-X modules

A Cisco SFP-10G-OLT20-X module is a hot-swappable optical transceiver that fits into standard SFP+ ports
on Cisco switches. It supports 10 Gigabit Ethernet connections up to 20 km. The module complies with Cisco
and industry OLT specifications.

Use a PON manager to monitor, configure, and manage the module.

Beginning with Cisco NX-OS Release 10.6(1)F, Cisco Nexus 9000 Series switches support the
SFP-10G-OLT20-X module.

For more information, see Transceiver Module (TMG) Compatibility Matrix.

Example: Viewing SFP module details

To view SFP module details, use the show interface transceiver details command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

31

Cisco SFP-10G-OLT20-X modules

Configuring Basic Interface Parameters

switch# show interface eth1/33 transceiver details

Ethernet1/33
transceiver is present
type is SFP-10G-OLT20
name is CISCO-TIBIT
part number is SFP-10G-OLT20-X
revision is 001
serial number is OLT-E09B2736AAB6
nominal bitrate is 10300 MBit/sec
Link length supported for 9/125um fiber is 20 km
cisco id is 3
cisco extended id number is 4

Low

High

Alarms

Warnings

SFP Detail Diagnostics Information (internal calibration)
----------------------------------------------------------------------------
Current
Measurement
----------------------------------------------------------------------------
Temperature
Voltage
Current
Tx Power
Rx Power
Transmit Fault Count = 0
----------------------------------------------------------------------------
Note: ++ high-alarm; + high-warning; -- low-alarm; - low-warning

-25.00 C
2.96 V
45.00 mA
2.99 dBm
-6.00 dBm -29.20 dBm

-20.00 C
3.13 V
50.00 mA
3.99 dBm
-28.23 dBm

75.00 C
3.46 V
115.00 mA
6.99 dBm
-7.00 dBm

80.00 C
3.63 V
120.00 mA
7.99 dBm

38.00 C
N/A

N/A
N/A

High

Low

N/A

2025 Apr 29 05:00:31 switch2 vsh.bin: DIAG VALUES

temp:38000,,,volt:0,,,curr:0,tx:0, rx_pwr: 0

Note

The command displays 'NA' in the current measurement field when the value for voltage, current, Tx power,
or Rx power is zero, until the PON port is enabled.

The Rx power always shows N/A in the show interface transceiver details command output.

Guidelines

Use these guidelines when using the SFP module.

• Use these suggested SLA values in the PON manager for this optic:

Downstream
Guaranteed Rate [kbps]: 128
Guaranteed Max Burst [bytes]: 100000
Best Effort Rate [kbps]: 10000000
Best Effort Max Burst [bytes]: 99999
Upstream
Fixed Rate [kbps]: 400
Guaranteed Rate [kbps]: 128
Guaranteed Max Burst [bytes]: 409600
Guaranteed Priority [1 Lowest, 8 Highest]: 1
Best Effort Rate [kbps]: 10000000
Best Effort Max Burst [bytes]: 409600
Best Effort Priority [1 Lowest, 8 Highest]: 1
Min Grant Period [100μs]: 0
Max Grant Period [100μs]: 10
Grant Limit [grants]: 8
Service Limit [kBytes]: 60
Service Weight [kBytes]: 0

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

32

Configuring Basic Interface Parameters

Best practices and limitations for interface configuration

• After you perform a shutdown operation or enable a no shutdown on the OLT optic port, allow a

five-minute settling time. This waiting period allows the PON manager to stabilize before you take more
action or verify status.

Best practices and limitations for interface configuration

Review these configuration guidelines and limitations for basic interface parameters.

• If you connect a Cisco N9K-C9348GC-FXP switch to a third-party (SRX4600 Firewall) firewall, and

any switch port is connected to the console port of a network device, all ports connected to the firewall
may experience link instability or only establish at 10 Mbps.

• MDIX is enabled by default on copper ports. You cannot disable MDIX

• show commands with the internal keyword are not supported.

• Use only Cisco-supported transceivers with fiber-optic Ethernet ports. To verify compatibility run the
show interface transceivers command. Interfaces with Cisco-supported transceivers are listed as
functional interfaces.

• You can configure a port either a Layer 2 interface or a Layer 3 interface; it cannot operate as both at

the same time. By default, each port operates as a Layer 3 interface.

Use the switchport command to convert a Layer 3 interface to a Layer 2 interface. Use the no
switchport command to convert a Layer 2 interface to a Layer 3 interface.

• You cannot use flow control with pause frames.

• Beginning with Cisco NX-OS Release 9.3(1), only MTU 9216 can be configured on FEX fabric ports.

Trying to configure any other value generates an error.

If the MTU value on a FEX fabric port-channel was set to 9216 before the switch was upgraded to Cisco
NX-OS Release 9.3(1), the show running config command does not display the MTU value, but the
show running-config diff command does.

• Beginning with Cisco NX-OS Release 9.3(1), FEX fabric port-channels support only MTU 9216 by

default.

• You cannot use Link Training with these line cards.

Nexus 9300 Modules:

• N9K-M12PQ (C9396PX, C9396TX, C93128PX, C93128TX)

Nexus 9500 Modules:

• X9536PQ

• X9564PX

• X9564TX

• When you use a backslash (\) at end of a valid interface description, the parser identifies the backslash
as a continuation character and appends an extra line break in command output by adding a new line
character '\n' to the command string. This is a Day-1 behavior.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

33

Best practices and limitations for interface configuration

Configuring Basic Interface Parameters

• Beginning with Cisco NX-OS Release 10.2(3)F, the link-flap error-disable count command can be

configured on all physical ports on all Cisco Nexus 9000 Series switches.

• On Cisco NX-OS Release 10.3(x) and 10.4(x), manually setting an interface speed to 100 Mbps on Nexus
9000 Series switches may prevent link establishment with certain non-Nexus devices that are also manually
set to 100 Mbps. To avoid this issue, enable auto-negotiation on the remote device, or use an intermediate
Layer 2 switch as a workaround if the remote configuration cannot be changed.

Guidelines for ethernet port speed and duplex mode

• You usually configure Ethernet port speed and duplex mode parameters to auto to allow the system to

negotiate the speed and duplex mode between ports. If you decide to configure the port speed and duplex
modes manually for these ports, consider the following:

• Before you configure the speed and duplex mode for an Ethernet or management interface, see the
Default Settings section for the combinations of speeds and duplex modes that can be configured
at the same time.

• If you set the Ethernet port speed to auto, the device automatically sets the duplex mode to auto.

• If you enter the no speed command, the device automatically sets both the speed and duplex

parameters to auto (the no speed command produces the same results as the speed auto command).

• If you configure an Ethernet port speed to a value other than auto (for example, 1G, 10G, or 40G),
you must configure the connecting port to match. Do not configure the connecting port to negotiate
the speed.

Note

The device cannot automatically negotiate the Ethernet port speed and duplex
mode if the connecting port is configured to a value other than auto.

Caution

Changing the Ethernet port speed and duplex mode configuration might shut
down and re-enable the interface.

• On Cisco Nexus 9000 Series Switches, the show interface and show interface capability commands
may display 100 Mbps as a supported speed for certain ports. However, this speed is only supported
when using the SFP-10G-T-X transceiver. For ports using GLC-TE transceivers, the lowest supported
speed is 1 Gbps.

Support for Auto negotiation

To configure speed, duplex, and automatic flow control for an Ethernet interface, you can use the negotiate
auto command. To disable automatic negotiation, use the no negotiate auto command.

For BASE-T copper ports, auto negotiation is enabled even when fixed speed is configured.

• Beginning with Cisco NX-OS Release 10.1(2), you can use auto negotiation for 40G and 100G speeds

on these switches.

• N9K-C93600CD-GX

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

34

Configuring Basic Interface Parameters

Best practices and limitations for interface configuration

• N9K-C9316D-GX

• N9K-C9364C-GX in NRZ mode

• Beginning with Cisco NX-OS Release 9.2(2), auto negotiation (40 G/100 G) is supported on the following

ports:

• Cisco Nexus 9336C-FX2 switch: Ports 1-6 and 33-36

• Cisco Nexus 93240YC-FX2 switch: Ports 51-54

• Cisco Nexus 9788TC line card: Ports 49-52

• Beginning with Cisco NX-OS Release 10.4(1)F, auto negotiation for 100G/40G is supported on the

Cisco Nexus 9332D-H2R platform switches. However, 400G is not supported.

• Beginning with Cisco NX-OS Release 10.4(2)F, auto negotiation for 100G/40G ports is supported

on the last four ports of Cisco Nexus 93400LD-H1 platform switches.

• Beginning with Cisco NX-OS Release 10.4(3)F, auto negotiation for 100G/40G ports is supported

on Cisco Nexus N9K-C9364C-H1 platform switches.

Non-Support for Auto negotiation

Auto negotiation is not supported on 400G and 200G Copper links on these Nexus switches. Configure
respective speed on the peer side to bring the link up.

Nexus switch

N9K-C9348D-GX2A

N9K-C9348D-GX2A

N9K-C9364D-GX2A

N9K-C9364D-GX2A

N9K-C9332D-GX2B

N9K-C9332D-GX2B

N9K-C93600CD-GX

N9K-C93600CD-GX

N9K-C9316D-GX

N9K-C9316D-GX

N9K-X9400-8D

N9K-X9400-8D

N9K-X9400-16W

Copper support (No auto
negotiation)

400G

200G

400G

200G

400G

200G

400G

200G

400G

200G

400G

200G

200G

Release

10.2(3)F

10.3(3)F

10.2(3)F

10.3(3)F

NX-OS 10.2(1q)F

10.3(3)F

9.3(5)

10.3(3)F

9.3(5)

10.3(3)F

10.3(3)F

10.3(3)F

10.5(1)F

• Auto negotiation is not supported on 25G breakout ports.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

35

Best practices and limitations for interface configuration

Configuring Basic Interface Parameters

• If cable length is more than 5 meters, auto negotiation is not supported. This cable length limitation is

applicable only to copper cables and not applicable to optical cables.

• Beginning with Cisco Nexus NX-OS Release 10.4(3)F, auto negotiation is not supported on

100G-CR2(PAM4)/ 4ZQ100G Copper links on these switches:

You must configure speed 100000 on peer side to bring the link up.

• N9K-C93600CD-GX

• N9K-C9316D-GX

Note

Beginning with Cisco Nexus NX-OS Release 10.4(3)F, on N9K-C93600CD-GX,
100G-CR2(PAM4) / 4ZQ100G Copper links is supported on ports 29-36 only.

• Beginning with Cisco NX-OS Release 10.4(2)F, you must configure same FEC on both 50Gx2 breakout

ports for the links to be active.

FEC type is not supported for auto negotiation on the ports. Verify that same configuration exist on both
ports if the default configurations are different on the ports.

• Auto negotiation is not supported when N9K-C93108TC-FX3P switch is connected to either of these

switches:

• N9K-C9236C, N9K-C92300YC, N9K-C9232C, N9K-C92300YC, and N9K-C93180YC-FX.

• N3K-C3172TQ-XL, N3K-C3172TQ-10GT, N3K-C3172PQ-10GE, and N3K-C3132Q-40GE.

• Beginning with Cisco NX-OS Release 10.5(2)F, on Cisco Nexus 9508 switches with N9K-X9736C-FX3

line card:

• Auto negotiation is disabled for QSFP-100G and QSFP-40G (copper) transceivers.

• Copper cable length of only 2m is supported.

Cisco Nexus C9348GC-FX3PH Switch

• From Cisco NX-OS Release 10.4(1)F, below limitations apply on Cisco Nexus C9348GC-FX3PH switch.

• On front ports 41 to 48, the control plane may be affected during congestion or line-rate traffic.

• No drop at 99.98% of line rate traffic.

• These interface counters are supported on front ports 41 to 48.

• Interface Packets - Ingress Packets, Rx Unicast Packets, Rx Multicast Packets, Rx Broadcast
Packets, Tx Unicast Packets, Egress Packets, Tx Multicast Packets, and Tx Broadcast Packets.

• Interface Errors - Ingress Runt Errors, Ingress FCS Error, Input Errors, Symbol Error, Ingress

CRC, and Output Errors.

• Interface Collision - Collision, Single Collision, Multi Collision, and Late Collision.

• Interface Bytes - Rx Bytes and Tx Bytes.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

36

Configuring Basic Interface Parameters

Best practices and limitations for interface configuration

• Other supported Interface counters - Tx Dropped, Short Frame, Jumbo Frames, Input Discard,

Deferred, and Jabber.

Cisco Nexus N9K-C9232E-B1 Switch

• Beginning with Cisco NX-OS Release 10.4(2)F the Cisco Nexus N9K-C9232E-B1 switch supports these

features.

• Supports breakout of 2 x 400G ports, 4 x 100G ports, and 8 x 100G ports.

• Supports breakout of 4 x 25G, and 2 x 50G on 100G fiber link and 100G optics.

• Supports native 400G ports and native 100G ports.

• 800G copper cables can be plugged only on 9 -24 ports.

Auto-negotiation is not supported on this switch.

Cisco Nexus 9808 and Cisco 9804

Beginning with Cisco NX-OS Release 10.3(1)F, the Cisco Nexus 9800 platform switches provides these
features.

• Support for Interface Consistency Checker.

• Native (400G, 100G, 40G) and breakout (4x100G) ports support is provided on N9K-X9836DM-A line

card.

• 10G Optics support using CVR-QSFP-SFP10G adapter is provided for the N9K-X9836DM-A line card

• Auto negotiation is not supported for 40G, 100G copper based links for N9K-X9836DM-A line card.

• Statistics support for physical interfaces.

• UDLD support.

• Cisco Nexus 9808/9804 platform switches have these limitations on physical interface statistics.

• Port-channel is not supported.

• Broadcast counters or statistics are not supported for interface counters.

• Locally generated or injected packets are not be classified into unicast, multicast or broadcast.

However, these are accounted under total packets and bytes. For example: CDP packets.

• You can view the frame sizes using the show interface ethernet 1/1 counters detailed snmp command.

This platform counter Range
===============
TX Frame octet Range
TX legal frames with 1519-2500 bytes.
TX legal frames with 2501-9000 bytes.
Nexus existing platform
================
TX Length=1519-2047
TX Length=2048-4095
TX Length=4096-8191
TX Length=8192-9215

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

37

Best practices and limitations for interface configuration

Configuring Basic Interface Parameters

TX Length>=9216
Similar frame size support exists for Rx direction also.

show interface ethernet 1/1 counters detailed snmp
Ethernet1/1
Rx Packets: 4004
Rx Unicast Packets: 4000
Rx Jumbo Packets: 4000
Rx Bytes: 7031737
Rx Packets from 65 to 127 bytes: 1
Rx Packets from 128 to 255 bytes: 1
Rx Packets from 512 to 1023 bytes: 1
Rx Packets from 1024 to 1518 bytes: 1
Rx Packets from 1519 to 2500 bytes: 4000 >>>> New range supported
Tx Packets: 17
Tx Bytes: 4948
Tx Packets from 0 to 64 bytes: 2
Tx Packets from 65 to 127 bytes: 3
Tx Packets from 128 to 255 bytes: 10
Tx Packets from 512 to 1023 bytes: 1
Tx Packets from 1024 to 1518 bytes: 1
Tx Packets from 1519 to 2500 bytes: 2 >>>>> New range

• Interface error counters such as align-err, runts, giants, input discards and output discards counters

are not supported and are displayed as 0.

For example:

show interface ethernet 1/1 counters errors

--------------------------------------------------------------------------------
Port Align-Err FCS-Err Xmit-Err Rcv-Err UnderSize OutDiscards
--------------------------------------------------------------------------------
Eth1/1 0 0 0 0 0 0

----------------------------------------------------------------------------------
Port Single-Col Multi-Col Late-Col Exces-Col Carri-Sen Runts
----------------------------------------------------------------------------------
Eth1/1 0 0 0 0 0 0

----------------------------------------------------------------------------------
Port Giants SQETest-Err Deferred-Tx IntMacTx-Er IntMacRx-Er Symbol-Err
----------------------------------------------------------------------------------
Eth1/1 0 -- 0 0 0 0

----------------------------------------------------------------------------------
Port InDiscards
----------------------------------------------------------------------------------
Eth1/1 0

--------------------------------------------------------------------------------
Port Stomped-CRC
--------------------------------------------------------------------------------
Eth1/1 0

Beginning with Cisco NX-OS Release 10.4(1)F, the Cisco Nexus 9800 platform switches provides these
features.

• UDLD support for Cisco Nexus 9804 Platform switches and Cisco Nexus X98900CD-A and X9836DM-A

line cards with Cisco Nexus 9808 and 9804 switches.

Breakout ports of 4 x 10G and 4 x 25G is provided on Cisco Nexus N9K-X9836DM-A line card of Cisco
Nexus 9800 Series switches.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

38

Configuring Basic Interface Parameters

Best practices and limitations for interface configuration

Cisco Nexus 93C64E-SG2-Q switch features

Beginning with Cisco NX-OS Release 10.5(3)F the Cisco Nexus 93C64E-SG2-Q switch supports these
features.

• Supports ports 8 x 100G, 2 x 400G, and 4 x 100G ports

• Native fixed speeds on 800G, 400G, 200G, and 100G interfaces

• Supports breakout modes on 8 x 100G, 2 x 400G, and 4 x 100G ports

• Supports 64 x QSFP-DD800 ports

• Optics support

• QDD-8X100G-FR

• QDD-8x100G-LR

• QDD-2X400G-FR4

• QDD-2x400G-LR4

Auto-negotiation is not supported.

Cisco Nexus 9336C-SE1 switch features

Beginning with Cisco NX-OS Release 10.6(1)F, Cisco Nexus 9336C-SE1 switch supports these features:

• Port profiles

• UDLD

Cisco N9300 Series smart switch features

Beginning with Cisco NX-OS Release 10.6(1s), the Cisco N9300 Series smart switches supports these features:

• Port profiles

• UDLD

Beginning with Cisco NX-OS Release 10.6(2)F, you can configure the following port speeds and breakout
combinations:

• Cisco N9324C-SE1U:

• Port speeds: 10G, 25G, 40G, 100G

• Breakout options: 4x10G, 4x25G, 2x50G

• Cisco N9348Y2C6D-SE1U:

• Port speeds: 10G, 25G, 40G, 100G, 400G

• Breakout options: 4x10G, 4x25G, 2x50G, 4x100G

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

39

Retimer ports

Configuring Basic Interface Parameters

Cisco Nexus N9396T12C-SE1 switch features

Beginning with Cisco NX-OS Release 10.6(2)F the Cisco Nexus N9396T12C-SE1 switch supports these
features:

• Supports only 10G on RJ45 Ports.

• Native Speeds on 100G and 40G interfaces

• Supports Breakout Modes of type 4 x 25G and 4 x 10G.

Auto-negotiation is not supported.

Cisco Nexus N9396Y12C-SE1 switch features

Beginning with Cisco NX-OS Release 10.6(2)F the Cisco Nexus N9396Y12C-SE1 switch supports these
features:

• Supports 50g native SFP links on top and bottom most ports of N9396Y12C-SE1 namely, 1,3,5 odd

ports till 47 and 50,52,54 even ports till 96

• Native speeds on 100G, 50G, 40G, 25G, 10G and 1G interfaces

• Supports breakout modes of type 4 x 25G and 4 x 10G

Auto-negotiation is not supported.

Retimer ports

Retimer ports are specialized hardware interfaces you can use on certain Nexus switches and line cards. These
ports:

• improve signal integrity between the forwarding engine and front-panel ports,

• may provide additional features such as MACsec or SyncE capabilities, and

• may experience slightly longer link-up times depending on speed, optics, cable, and link partner

characteristics.

Retimer ports may experience longer link-up times depending on the negotiated speed, optics, transceiver,
and cable used, as well as specific characteristics of the connected link partner.

In most cases, retimer ports link up within a few seconds. Occasionally, link-up time may be higher depending
on negotiated parameters and hardware used.

The table lists Nexus switches and line cards that support retimer ports and identifies the specific ports on
each device.

Table6:Supportedretimerports

Switch or Line cards

Retimer Ports

N9K-X9788TC-FX

49-52

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

40

Configuring Basic Interface Parameters

Retimer ports

Switch or Line cards

Retimer Ports

N9K-C93240YC-FX2

51-54

N9K-C93240YC-FX2-Z

N9K-C9336C-FX2

1-6, 33-36

N9K-X96136YC-R

N9K-X9736C-FX

N9K-C93180YC-FX3

N9K-C93216TC-FX2

N9K-C93360YC-FX2

N9K-X9716D-GX

N9K-C9336C-FX2-E

N9K-C9332D-GX2B

N9K-C9348D-GX2A

N9K-C9364D-GX2A

N9K-X9836DM-A

N9K-X9400-22L

N9K-X9400-16W

N9K-X9400-8D

N9K-C9364C-H1

N9K-C93400LD-H1

N9K-C9332D-H2R

49-52

29-36

1-54

97-108

1-16

1-8

25-32

1-48

1-32

1-36

1-22

1-16

1-8

1-64

1-52

1-32

N9K-X98900CD-A

1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46

N9K-C9348GC-FX3

N9K-C9348GC-FX3PH

N9K-C93108TC-FX3

N9K-C92348GC-FX3

49-54

49-54

49-54

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

41

Default settings for interface parameters

Configuring Basic Interface Parameters

Default settings for interface parameters

The table shows the default settings for the basic interface parameters.

Parameter

Description

Beacon

Bandwidth

Throughput delay

Administrative status

MTU

UDLD global

Default

Blank

Disabled

Data rate of interface

100 microseconds

Shutdown

1500 bytes

Globally disabled

UDLD per-port enable state for fiber-optic media

Enabled on all Ethernet fiber-optic LAN ports

UDLD per-port enable state for copper media

Disabled on all Ethernet 1G, 10G, or 40G LAN ports

UDLD message interval

UDLD aggressive mode

Error disable

Error disable recovery

Error disable recovery interval

Buffer-boost

Disabled

Disabled

Disabled

Disabled

300 seconds

Enabled

Note
This feature is available on N9K-X9564TX and
N9K-X9564PX line cards and Cisco Nexus 9300
series devices.

Configure the basic interface parameters

Basic interface parameters are configuration elements that

• determine how your network interface operates in your device,

• specify essential settings such as IP address, duplex mode, and speed,

• and help you ensure proper connectivity and protocol compatibility on your network.

You must specify the interface before you can configure the parameters of the interface

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

42

Configuring Basic Interface Parameters

Specify the interfaces for configuration

Specify the interfaces for configuration

The interface range configuration mode allows you to configure multiple interfaces of the same or different
types using shared configuration parameters. After specifying the interfaces, all subsequent commands affect
the selected interfaces until exiting interface configuration mode.

Use these steps to specify interfaces for configuration.

Before you begin

Review interface types and their method of identification.

Table7:InterfaceTypesandTheirIdentificationMethod

Interface Type

Ethernet

Management

Identity

I/O module slot numbers and port numbers on the
module

0 (for port 0)

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specify one or more interface to configure using the interface interface command.

Ethernet interfaces: To specify a single Ethernet interface.

Note
No space is required between the interface type and identity (port or slot/port number).

For example, for the Ethernet slot 4, port 5 interface, you can specify either “ethernet 4/5” or “ethernet4/5.”

Example:

switch(config)# interface ethernet 2/1
switch(config-if)#

To specify a range of contiguous Ethernet interfaces (using a dash “-”):

Example:

switch(config)# interface ethernet 2/29-30
switch(config-if-range)#

To specify noncontiguous Ethernet interfaces (using commas and full specification for each):

Note
When specifying noncontiguous interfaces, enter the interface type for each entry for syntax flexibility: You may omit
the space between the type and identity - “ethernet 4/5” or “ethernet4/5”.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

43

Add description parameters to interfaces

Configuring Basic Interface Parameters

switch(config)# interface ethernet 2/29, ethernet 2/33, ethernet 2/35
switch(config-if-range)#

Use this syntax for breakout cables or multi-level slots:

switch(config)# interface ethernet 1/2/1
switch(config-if-range)#

Management interface

The management interface is either “mgmt0" or “mgmt 0”.

Example:

switch(config)# interface mgmt0
switch(config-if)#

VLAN interface

Example:

switch(config)# interface vlan 10

switch(config-if)#

Loopback interface

Example:

switch(config)# interface loopback 1

switch(config-if)#

Subinterfaces

You can specify a range of subinterfaces only on the same port (using dash “-”). You can specify multiple subinterfaces
discretely using commas:

Note
You cannot specify a range crossing different ports (for example, “2/29.2-2/30.2” is invalid).

Example:

switch(config)# interface ethernet 2/29.1-2

switch(config-if-range)#

You are now in interface configuration mode for the specified interfaces and ready to apply configuration
parameters.

Add description parameters to interfaces

You can add text descriptions to Ethernet and management interfaces.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

44

Configuring Basic Interface Parameters

Add description parameters to interfaces

Step 2

Specify the interface using the interface interface command.

Example:

switch(config)# interface ethernet 2/1
switch(config-if)#

Example:

switch(config)# interface mgmt0
switch(config-if)#

• For an Ethernet port, use ethernet slot/port . For example, slot 2, port 1 identifies Ethernet interface 2/1.

• For the management interface, use mgmt0 . For example, mgmt0 identifies the management interface.

Step 3

Add a description using the description text command.

Example:

switch(config-if)# description Ethernet port 3 on module 1
switch(config-if)#

Step 4

(Optional) View the description using the show interface interface command.

Example:

switch(config)# show interface ethernet 2/1

Example:

switch(config)# show interface mgmt 0

Starting with Cisco NX-OS release 10.4(1)F and later versions, you can view the description of the management interface.

Step 5

Exit the configuration.

Example:

switch(config-if)# exit
switch(config)#

Step 6

(Optional) Save the current running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

Example

This example shows how to set the interface description to Ethernet port 24 on module 3:

switch# configure terminal
switch(config)# interface ethernet 3/24
switch(config-if)# description server1
switch(config-if)#

The output of the show interface eth command is enhanced as shown in the following example:

Switch# show version
Software

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

45

Enable beacon mode for an Ethernet port

Configuring Basic Interface Parameters

BIOS: version 06.26
NXOS: version 6.1(2)I2(1) [build 6.1(2)I2.1]
BIOS compile time: 01/15/2014
NXOS image file is: bootflash:///n9000-dk9.6.1.2.I2.1.bin
NXOS compile time: 2/25/2014 2:00:00 [02/25/2014 10:39:03]

switch# show interface ethernet 6/36
Ethernet6/36 is up
admin state is up, Dedicated Interface
Hardware: 40000 Ethernet, address: 0022.bdf6.bf91 (bia 0022.bdf8.2bf3)
Internet Address is 192.168.100.1/24
MTU 9216 bytes, BW 40000000 Kbit, DLY 10 usec

The output of the show interface mgmt command is enhanced as shown in the following example:

switch# show interface mgmt 0mgmt0 is up
admin state is up,

Hardware: GigabitEthernet, address: d009.c863.6660 (bia d009.c863.6660)
Internet Address is 10.10.1.1
MTU 1500 bytes, BW 1000000 Kbit , DLY 10 usec
reliability 255/255, txload 1/255, rxload 1/255
Encapsulation ARPA, medium is broadcast
full-duplex, 1000 Mb/s
Auto-Negotiation is turned on
Auto-mdix is turned off
EtherType is 0x0000
1 minute input rate 208920 bits/sec, 146 packets/sec
1 minute output rate 514648 bits/sec, 144 packets/sec
Rx

11890676 input packets 11773213 unicast packets 97704 multicast packets
19759 broadcast packets 2089190866 bytes

Tx

11776034 output packets 11774699 unicast packets 1323 multicast packets
12 broadcast packets 5228573079 bytes

Management transceiver: Present
Active connector: SFP

The active connector will show SFP when RJ45 connector is removed.

Enable beacon mode for an Ethernet port

Flash the device's status LED to locate a specific Ethernet port.

Procedure

Step 1

Enter global configuration mode. configure terminal

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the interface using the interface ethernet slot/port command.

Example:

switch(config)# interface ethernet 3/1
switch(config-if)#

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

46

Configuring Basic Interface Parameters

Configure the error-disabled state

Step 3

Enable the beacon mode using the [no] beacon command.

Example:

switch(config)# beacon
switch(config-if)#

The default mode is disabled. Use the [no] beacon command to disable the beacon mode. T

Step 4

(Optional) View the interface status using the show interface ethernet slot/port command.

Example:

switch(config)# show interface ethernet 2/1
switch(config-if)#

Step 5

Exit the configuration mode.

Example:

switch(config-if)# exit
switch(config)#

Step 6

(Optional) Save the running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

The Ethernet port's LED flashes, so you can confirm the port's physical location visually.

Example

This example shows how to enable the beacon mode for the Ethernet port 3/1:

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# beacon
switch(config-if)#

This example shows how to disable the beacon mode for the Ethernet port 3/1:

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# no beacon
switch(config-if)#

This example shows how to configure the dedicated mode for Ethernet port 4/17 in the group that
includes ports 4/17, 4/19, 4/21, and 4/23:

switch# configure terminal
switch(config)# interface ethernet 4/17, ethernet 4/19, ethernet 4/21, ethernet 4/23
switch(config-if)# shutdown
switch(config-if)# interface ethernet 4/17
switch(config-if)# no shutdown
switch(config-if)#

Configure the error-disabled state

An error-disabled state is a network interface condition that

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

47

Enable the error-disable detection

Configuring Basic Interface Parameters

• disables a port or interface automatically when a predefined fault or violation is detected,

• sends signals to the administrator with the specific error that caused the shutdown.

Common causes for interfaces entering error-disabled states include:

• BPDU Guard violations

• Unidirectional Link Detection (UDLD) malfunctions

• Port security breaches (such as excessive MAC address violations)

• Link flapping or physical layer errors

Network devices often provide logs or status messages to indicate the specific reason an interface was disabled.

You can view the reason that an interface moves to the error-disabled state and configure automatic recovery.

Enable the error-disable detection

Use this task to configure error-disable detection so that interfaces interfaces enter an error-disabled state
when certain faults, such as link flaps or ACL exceptions, are detected.

You can enable error-disable detection in an application. As a result, when a cause is detected on an interface,
the interface is placed in an error-disabled state, which is an operational state that is similar to the link-down
state.

Before you begin

You must have access to a device with appropriate administrative privileges (enable and configuration mode
access).

Save your running configuration to prevent losing changes

.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specifiy one or more error condition to trigger error-disable on inteface using the errdisable detect cause {acl-exception
| all | link-flap | loopback}

Example:

switch(config)# errdisable detect cause all
switch(config-if)#

Error-disable detection is enabled by default for supported causes.

Step 3

Set the link-flap error-disable count and interval to specify how many flaps occur in a given interval using the link-flap
error-disable count number_of_link_flaps interval time_in_seconds command.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

48

Configuring Basic Interface Parameters

Recover an interface from error-disabled state

switch(config-if)# link-flap error-disable count 10 interval 30

• count the maximum number of allowed link flaps (range: 2–30).

• interval specifies seconds within which the flaps are counted (range: 30–420).

Step 4

If an interface is placed in error-disabled state and requires manual recovery:

a) Administratively shut down the interface.

Example:

switch(config-if)# shutdown
switch(config)#

b) Administratively bring the interface back up.

Example:

switch(config-if)# no shutdown
switch(config)#

Note
These commands clear the error-disabled state and restore interface operation.

Step 5

(Optional) View information about error-disabled interfaces using the show interface status err-disabled command.

Example:

switch(config)# show interface status err-disabled

Step 6

(Optional) Save the running configuration using the copy running-config startup-config command.

Example:

switch(config)# copy running-config startup-config

Error-disable detection is enabled so that when configured causes are detected on an interface, the interface
enters the error-disabled state.

Example

This example shows how to enable the error-disabled detection in all cases:

switch(config)# errdisable detect cause all
switch(config)#

Recover an interface from error-disabled state

An interface may become error-disabled for several reasons. Configure recovery to allow the interface to
attempt to come up again after a specified interval.

You can specify the application to bring the interface out of the error-disabled state. By default, the interface
retries after 300 seconds unless you configure the recovery timer using the errdisable recovery interval
command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

49

Set the error-disabled recovery interval for interfaces

Configuring Basic Interface Parameters

Before you begin

Ensure you have administrative access to the switch CLI.

Confirm the error-disabled cause for the interface.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the condition for automatic recovery using the errdisable recovery cause {all | bpduguard | failed-port-state
| link-flap | loopback | miscabling | psecure-violation | security-violation | storm-control | udld | vpc-peerlink}
command.

Example:

switch(config)# errdisable recovery cause all
switch(config-if)#

The device attempts to bring up the interface and waits 300 seconds before another attempt. Automatic recovery is disabled
by default.

Step 3

(Optional) View error-disabled interface information using the show interface status err-disabled command.

Example:

switch(config)# show interface status err-disabled
switch(config-if)#

Step 4

Save the running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

The switch attempts to bring the interface up after the recovery interval (default 300 seconds), based on the
conditions you specify.

Example

This example shows how to enable error-disabled recovery under all conditions:

switch(config)# errdisable recovery cause all
switch(config)#

Set the error-disabled recovery interval for interfaces

When a switch port enters an error-disabled state, you can control how long the port remains disabled before
the switch attempts recovery.

Configuring the error-disabled recovery interval automates port recovery and minimizes unnecessary downtime

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

50

Configuring Basic Interface Parameters

Configure MDIX parameters

Use these steps to configure the error-disabled recovery timer value.

Before you begin

Determine the desired interval (in seconds) for port recovery (valid range: 30–65535 seconds).

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Set the interval for the interface to recover from the error-disabled state using the errdisable recovery interval interval
command.

Example:

switch(config)# errdisable recovery interval 32
switch(config-if)#

The interval range value is from 30 to 65,535 seconds. The default value is 300 seconds.

Step 3

(Optional) View information on error-disabled interfaces using the show interface status err-disabled command.

Example:

switch(config)# show interface status err-disabled
switch(config-if)#

Step 4

(Optional) Save the running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

The switch automatically attempts to recover any error-disabled interfaces after the specified interval. Ports
previously disabled by error conditions begin the recovery process based on your configured timer.

Example

This example shows how to configure the error-disabled recovery timer to set the interval for recovery
to 32 seconds:

switch(config)# errdisable recovery interval 32
switch(config)#

Configure MDIX parameters

Configure MDIX on a port when you connect devices that use different or unknown cable types. Most devices
have MDIX enabled by default to maximize flexibility.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

51

Configure MDIX parameters

Configuring Basic Interface Parameters

To detect the type of connection with another copper Ethernet port, enable MDIX on the local port. By default,
this parameter is enabled.

Before you begin

Confirm the interface and the platform support manual MDIX configuration. Enable MDIX on the remote
port.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal

switch(config)#

\

Step 2

Specify an interface using the interface ethernet slot / port command.

Example:

switch(config)# interface ethernet 3/1

switch(config-if)#

Step 3

Enable MDIX detection using the {mdix auto} command.

Example:

switch(config)# mdix auto

switch(config-if)#

switch(config)# no mdixswitch(config-if)#

The no mdix command disables MDIX detection.

Note
The no mdix auto command is supported only on , N9K-C93108TC-FX, N9K-X9788TC-FX, and N9K-C9348GC-FXP
devices.

Step 4

Verify the MDIX parameters using the show interface ethernet slot / port command.

Example:

switch(config)# show interface ethernet 3/1

switch(config-if)#

Step 5

Exit the configuration.

Example:

switch(config)# exit

Step 6

Save the running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

52

Configuring Basic Interface Parameters

Configure the media-type on management interface

After you complete these steps, the MDIX mode remains set on the interface.

Example

This example shows how to enable MDIX for Ethernet port 3/1:

switch# configure terminal

switch(config)# interface ethernet 3/1
switch(config-if)# mdix auto
switch(config-if)#

This example shows how to enable MDIX for Ethernet port 3/1:

switch# configure terminal

switch(config)# interface ethernet 3/1
switch(config-if)# no mdix
switch(config-if)#

Configure the media-type on management interface

Starting with Cisco NX-OS Release 10.6(1)F, you can set or reset the media type for your device’s management
interface.

This ensures compatibility with the physical network medium in use. The management interface supports
RJ45, SFP, or auto mode. By default, the media type is set to auto.

Use this procedure to configure the media-type for the management interface.

Before you begin

Identify the required media type for your network (RJ45, SFP, or auto).

Procedure

Step 1

Enter global configuration mode.

Example:

Switch# configure terminal

Step 2

Enter the interface configuration mode for the management interface.

Example:

Switch (config)# interface mgmt 0

Step 3

Set the media type for the interface using the [no] media-type [ rj45 | sfp | auto ]

Example:

Switch (Config)# media-type rj45

Set the media-type value for the management interface.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

53

Configure media-type for SFP-10G-T-X transceivers

Configuring Basic Interface Parameters

• media-type rj45 : Sets the media-type to RJ45.

• media-type sfp : Sets the media-type to SFP.

• media-type auto : Sets the media-type to auto.

To return to the default selection, use the no media-type on the management interface.

Note
The default configuration is media-type auto.

The management interface is configured to use the specified media type. The device uses the configured media
option for network connectivity.

Example

Use the show running-config interface mgmt0 command to view the media-type value on the
management interface.

switch# show running-config interface mgmt0

!
interface mgmt0
vrf member management
ip address 172.29.149.188/24

mgmt0 is up
admin state is up,
Hardware: GigabitEthernet, address: 00a3.8e6d.800e (bia 00a3.8e6d.800e)

MTU 1500 bytes, BW 1000000 Kbit , DLY 10 usec
reliability 255/255, txload 1/255, rxload 1/255
Encapsulation ARPA, medium is broadcast
full-duplex, 1000 Mb/s
Auto-Negotiation is turned on
Auto-mdix is turned off
EtherType is 0x0000
1 minute input rate 3544 bits/sec, 5 packets/sec
1 minute output rate 1472 bits/sec, 0 packets/sec
Rx
1263 input packets 0 unicast packets 654 multicast packets
609 broadcast packets 112586 bytes
Tx
19 output packets 0 unicast packets 8 multicast packets
11 broadcast packets 2641 bytes
Management transceiver: Present
Active connector: RJ45
Configured Media-type: RJ45

Configure media-type for SFP-10G-T-X transceivers

Use this task to specify the SFP-10G-T-X media type for a device interface. To configure this, enter the
media-type 10g-tx command in interface configuration mode. To restore the default, enter the no media-type
10g-tx command.

Use these steps to configure the media type for an SFP-10G-T-X transceiver.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

54

Configuring Basic Interface Parameters

Verify media-type

Procedure

Command or Action

Step 1

Enter global configuration mode.

Example:

Switch# configure terminal

Purpose

Step 2

Enter interface configuration mode for the interface that
has the SFP-10G-T-X installed.

Example:

Switch (config)# interface ethernet 1/5

Step 3

Configure the media type as 10G-TX on the interface by
using the media-type 10g-tx command.

Example:

Switch (Config)# [no] media-type 10g-tx

Note
If the interface is configured with media-type 10G-TX
while in the administrative "up" state and does not support
this configuration,the interface enters into the error-disabled
state. To recover, enter these commands on the interface:

• shutdown

• no shutdown

The interface is set to use the SFP-10G-T-X media type. If the interface does not support this configuration,
you may need to take additional steps to recover from an error-disabled state

Verify media-type

Verify the media-type configuration on Cisco switches using these commands. The media-type defines the
physical interface’s capabilities (such as copper or fiber and supported speeds).

• show running-config interface interface: Displays the current configuration, including the media-type

set for the specified interface.

• show interface status: Lists all active interfaces, their operational status, speed, and detected media

type,. For example, SFP-10G-T-X modules may be present on various ports.

• show module: Shows detailed information about installed hardware modules, including supported port

types and slot details.

Use this example to verify the media-type configuration:

Note

Ports supporting SFP-10G-T-X modules may differ between devices. This example displays the port numbers
for SFP-10G-T-X on a Cisco Nexus N9K-C93240YC-FX2 switch.

switch# show running-config interface ethernet 1/2

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

55

Verify media-type

Configuring Basic Interface Parameters

!Command: show running-config interface Ethernet1/2
!Running configuration last done at: Mon Jun 1 10:16:46 2020
!Time: Mon Jun 1 10:16:54 2020

version 9.3(5) Bios:version 05.41

interface Ethernet1/2
switchport
switchport access vlan 10
mtu 9216
media-type 10g-tx
no shutdown

Supported ports in Switch 01:

switch# show interface status | i i SFP-10

Eth1/2

Eth1/6

Eth1/8

Eth1/12

Eth1/14

Eth1/18

Eth1/20

Eth1/24

Eth1/26

Eth1/30

Eth1/32

Eth1/36

Eth1/38

Eth1/42

--

--

--

--

--

--

--

--

--

--

--

--

--

--

connected 10

full

10G

SFP-10G-T-X

connected 11

full

10G

SFP-10G-T-X

connected 11

full

10G

SFP-10G-T-X

connected 12

full

10G

SFP-10G-T-X

connected 12

full

10G

SFP-10G-T-X

connected 13

full

10G

SFP-10G-T-X

connected 13

full

10G

SFP-10G-T-X

connected 14

full

10G

SFP-10G-T-X

connected 14

full

10G

SFP-10G-T-X

connected 15

full

10G

SFP-10G-T-X

connected 15

full

10G

SFP-10G-T-X

connected 16

full

10G

SFP-10G-T-X

connected 16

full

10G

SFP-10G-T-X

connected 20

full

10G

SFP-10G-T-X

Eth1/44

Connect_to_Sw_01

connected 202

full

10G

SFP-10G-T-X

Eth1/48

Connect_to_Sw_02

connected 202

full

10G

SFP-10G-T-X

switch# show module
Mod Ports
--- ----- ------------------------------------- --------------------- ---------

Module-Type

Status

Model

1

60

48x10/25G + 12x40/100G Ethernet Modul N9K-C93240YC-FX2

active *

Mod Sw
Slot
--- ----------------------- ------ ----
1

9.3(4.104)

0.3020 NA

Hw

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

56

Configuring Basic Interface Parameters

Set MTU size

Mod MAC-Address(es)
Serial-Num
--- -------------------------------------- ----------
1

b4-de-31-94-4e-c8 to b4-de-31-94-4f-0f FDO2143306S

Mod Online Diag Status
--- ------------------
1

Pass

Set MTU size

A maximum transmission unit (MTU) size is a network interface parameter that

• defines the largest packet size an interface can transmit without fragmentation,

• differs depending on whether the interface is Layer 2 or Layer 3, and

• can be set to the default, jumbo, or a custom value to suit network requirements.

Default values

• Every interface has a default MTU of 1500 bytes, known as the system default MTU.

• Layer 2 interfaces can be configured with a value of 9216 bytes, which is the default value for the system

jumbo MTU.

Guidelines to configure MTU size

MTU is configured per interface. Interfaces may be Layer 2 or Layer 3.

• For Layer 2 interfaces, you can select either the system default MTU (1500 bytes) or the system jumbo

MTU (9216 bytes by default).

To configure a Layer 2 MTU between 1500 and 9216 bytes, first adjust the system jumbo MTU to the
desired value. Then, set the interface MTU.

Note

When the system jumbo MTU size is changed, all Layer 2 interfaces using the
system jumbo MTU are automatically updated to the new value.

• For Layer 3 interfaces (physical, switch virtual interface [SVI], or subinterface), you can set an MTU

size between 576 and 9216 bytes.

Examples

If you set the system jumbo MTU to 9000 bytes, all Layer 2 interfaces configured to use the jumbo value
change to 9000 bytes.

To configure a Layer 3 SVI with an MTU of 2000 bytes, set the MTU directly on the SVI within the range
of 576 to 9216 bytes.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

57

Configure MTU size for interfaces

Configuring Basic Interface Parameters

Configure MTU size for interfaces

Configuring the MTU size allows you to optimize network performance for specific applications and ensure
compatibility with upstream or downstream devices. The MTU settings may differ between Layer 2 and Layer
3 interfaces.

Before you begin

Determine whether you are configuring a Layer 2, Layer 3, or a management interface

Ensure you know the appropriate MTU value.

• For Layer 3 interfaces (including physical, SVI, or subinterfaces), enter a value between 576 and 9216

bytes.

• For Layer 2 interfaces, enter 1500 (system default) or the system jumbo MTU value (default is 9216

bytes; this value can be adjusted).

For management interfaces on Cisco Nexus 9000 switches running Cisco NX-OS Release 9.3(1) or later,
up to 9216 bytes are supported.

Note

When you change the MTU size, the end device may briefly lose its network connection.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the ethernet interface to configure using the interface ethernet slot/port, vlan vlan-id mgmt 0 command.

Example:

switch(config)# interface ethernet 3/1
switch(config-if)#
switch(config)# interface vlan 100
switch(config-if)#
switch(config)# interface mgmt 0
switch(config-if)#

Step 3

Configure the MTU value on an interface using the mtu size command.

Example:

switch(config-if)# mtu 9216
switch(config-if)#

size is the desired MTU value within the supported range for the interface type

• For Layer 3 interfaces, enter a value between 576 and 9216 bytes.

• For Layer 2 interfaces, enter 1500 or the system jumbo MTU value

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

58

Configuring Basic Interface Parameters

Set the system jumbo MTU size

If you need to use a different system jumbo MTU size for Layer 2 interfaces, see Set the system jumbo MTU size.

Step 4

Exit the configuration.

Example:

switch(config-if)# exit
switch(config)#

The interface you selected uses the MTU value that you configured for packet transmission.

Example

This example shows how to configure the Layer 2 Ethernet port 3/1 with the default MTU size (1500):

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# switchport
switch(config-if)# mtu 1500
switch(config-if)#

This example displays the output of show running-config interface command:

switch# show run int mgmt0
!Command: show running-config interface mgmt0
!Running configuration last done at: Fri May 31 11:32:28 2019
!Time: Fri May 31 11:32:33 2019
version 9.3(1) Bios:version 07.65
interface mgmt0
mtu 9216
vrf member management
ip address 168.51.170.73/82

Set the system jumbo MTU size

Set the system jumbo MTU when your network environment requires support for frames larger than standard
Ethernet frames to increase throughput for high-performance applications. The system jumbo MTU must be
an even number between 1500 and 9216. The default is 9,216 bytes.

Procedure

Step 1

Enter global configuration mode. configure terminal

Example:

switch# configure terminal

switch(config)#

Step 2

Set the system jumbo MTU size using the system jumbomtu size command.

Example:

switch(config)# system jumbomtu 8000

switch(config)#

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

59

Configure the bandwidth for Ethernet interfaces

Configuring Basic Interface Parameters

Use an even number between 1,500 to 9,216.

Step 3

Specify the Layer 2 interface using the interface type slot/port command.

Example:

switch(config)# interface ethernet 2/1

switch(config-if)#

Step 4

Apply the MTU to the interface using the mtu size command.

Example:

switch(config-if)# mtu 8000

switch(config-if)#

Step 5

Exit the configuration.

Example:

switch(config-if)# exit

switch(config)#

Exits the interface mode.

Step 6

(Optional) Save the running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

Layer 2 interfaces use the new jumbo MTU value, supporting larger frames as specified.

Example

This example shows how to configure the system jumbo MTU as 8000 bytes and how to change the
MTU specification for a Layer 2 interface that was configured with the previous jumbo MTU size:

switch# configure terminal

switch(config)# system jumbomtu 8000
switch(config)# interface ethernet 2/2
switch(config-if)# mtu 8000

Configure the bandwidth for Ethernet interfaces

In Nexus switches, the bandwidth command sets an informational value for Layer 3 protocols. The physical
bandwidth of Ethernet interfaces, such as 1G, 10G, or 40G, cannot be changed.

Procedure

Step 1

Enter global configuration mode.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

60

Configuring Basic Interface Parameters

Set the throughput delay interval

switch# configure terminal
switch(config)#

Step 2

Specify an Ethernet interface using the interface ethernet slot/port command.

Example:

switch(config)# interface ethernet 3/1
switch(config-if)#

Step 3

Set the bandwidth using the bandwidth kbps command.

Example:

switch(config-if)# bandwidth 1000000
switch(config-if)#

The bandwidth is an informational-only value. It ranges from 1 and 100,000,000 kilobits per second.

Step 4

(Optional) View the interface status using the show interface ethernet slot/port command.

Example:

switch(config)# show interface ethernet 2/1

Step 5

Exit the configuration mode.

Example:

switch(config-if)# exit
switch(config)#

Step 6

(Optional) Save the running configuration to the startup configuration.

Example:

switch(config)# copy running-config startup-config

The interface displays the updated informational bandwidth value for Layer 3 protocols. The physical interface
bandwidth remains unchanged.

Example

This example shows how to configure an informational value of 1,000,000 kbps for the Ethernet slot
3, port 1 interface bandwidth parameter.

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# bandwidth 1000000
switch(config-if)#

Set the throughput delay interval

The throughput delay value provides information and affects protocol path preference for Ethernet interfaces.

You can set an informational value in the range of 1 and 16,777,215 tens of microseconds.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

61

Set the throughput delay interval

Configuring Basic Interface Parameters

Before you begin

Ensure the EIGRP feature is enabled by running the feature eigrp command.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the interface using the interface ethernet slot/port command.

Example:

switch(config)# interface ethernet 3/1
switch(config-if)#

Step 3

Set the delay interval using the delay value command.

Example:

switch(config-if)# delay 10000
switch(config-if)#

Configure a value between 1 and 16,777,215 tens of microseconds.

Step 4

View the interface status to verify the delay setting.

Example:

switch(config)# show interface ethernet 3/1
switch(config-if)#

Step 5

(Optional) Exit the configuration.

Example:

switch(config-if)# exit
switch(config)#

Step 6

(Optional) Save the running configuration to startup configuration.

Example:

switch(config)# copy running-config startup-config

Example

This example configures a high delay value for Ethernet 7/47 and a lower (default) value for 7/48,
making 7/48 the preferred interface. A lower delay value is preferred over a higher value.

switch# configure terminal
switch(config)# interface ethernet 7/47
switch(config-if)# delay 16777215
switch(config-if)# ip address 192.168.10.1/24
switch(config-if)# ip router eigrp 10

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

62

Configuring Basic Interface Parameters

Shut down and activate interfaces

switch(config-if)# no shutdown
switch(config-if)# exit
switch(config)# interface ethernet 7/48
switch(config-if)# ip address 192.168.11.1/24
switch(config-if)# ip router eigrp 10
switch(config-if)# no shutdown
switch(config-if)#

Shut down and activate interfaces

You may need to temporarily disable (shut down) or enable (activate) an interface for maintenance,
troubleshooting, or configuration.

When an interface is shut down, it becomes disabled. The monitoring displays it as down, and routing protocols
exclude it from updates. You can reactivate the interface at any time. You can restart the device to reactivate
the interface.

Use these steps to shut down and activate an interface.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the target interface using the interface interface command.

Example:

switch(config)# interface ethernet 2/1
switch(config-if)#

switch(config)# interface mgmt0
switch(config-if)#

You can specify the interface type and identity.

Note
Use ethernet slot/port for Ethernet interfaces and mgmt0 for management interfaces.

Examples

• Ethernet interfaces: The first example shows how to specify the slot 2, port 1 Ethernet interface.

• Management interface: The second example shows how to specify the management interface.

Step 3

Disable the interface using the shutdown command.

Example:

switch(config-if)# shutdown
switch(config-if)#

Step 4

(Optional) View the interface status using the show interface interface command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

63

Enable UDLD modes on interfaces

Configuring Basic Interface Parameters

Example:

switch(config-if)# show interface ethernet 2/1
switch(config-if)#

Step 5

Enable (activate) the interface using the no shutdown command.

Example:

switch(config-if)# no shutdown
switch(config-if)#

Step 6

(Optional) View the status of the interface again.

Example:

switch(config-if)# show interface ethernet 2/1
switch(config-if)#

Step 7

Exit the interface mode.

Example:

switch(config-if)# exit
switch(config)#

Step 8

(Optional) Save the running configuration to the startup configuration with the copy running-config startup-config

Example:

switch(config)# copy running-config startup-config

When you enable the port, its administrative status changes from disabled (down) to enabled (up). The interface
becomes active and is included in routing updates.

Example

This example shows how to disable and re-enable Ethernet port 3/1:

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# shutdown
switch(config-if)# no shutdown
switch(config-if)#

Enable UDLD modes on interfaces

UDLD detects unidirectional links on fiber and copper Ethernet ports and prevents network issues caused by
one-way communication. Enable UDLD globally or per interface. Select normal or aggressive mode according
to reliability needs. You can enable aggressive mode globally for all fiber ports or on individual interfaces.

:

This table lists the commands to enable and disable UDLD on different interfaces.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

64

Configuring Basic Interface Parameters

Enable UDLD modes on interfaces

Table8:DefaultUDLDSettingsforFiberandCopperPorts

Description

Default setting

Fiber port

Enabled

Enable UDLD command

no udld disable

Copper or Non-fiber port

Disabled

udld enable

Disable UDLD command

udld disable

no udld enable

Use these steps to enable UDLD mode.

Before you begin

Before enabling UDLD, ensure it is enabled globally using the feature udld command. On copper ports,
explicitly enable UDLD for each interface. On fiber ports, UDLD is enabled by default; confirm this with the
no udld disable command.

Enable aggressive UDLD mode only after you have configured UDLD globally and on each specified interface.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Enable UDLD globally using the feature udld command.

Example:

switch(config)# feature udld
switch(config)#

switch(config)# no feature udld
switch(config)#

Use the no feature udld command to disable UDLD fiber ports by default.

Step 3

(Optional) Specify the interval to send UDLD messages using the udld message-time seconds command.

Example:

switch(config)# udld message-time 30
switch(config)#

The range is 7 to 90 seconds; the default value is 15 seconds

Step 4

Enable UDLD in aggressive mode using the udld aggressive command.

Example:

switch(config)# udld aggressive
switch(config)#

Use the no form to disable aggressive mode UDLD on all fibers ports by default.

Note
Use the udld aggressive command to configure the ports.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

65

Enable UDLD modes on interfaces

Configuring Basic Interface Parameters

• For all fiber ports, use the udld aggressive command in global configuration mode.

• For specific copper interfaces, enter interface configuration mode interface ethernet slot/port and enable the udld

aggressive command.

Step 5

Enable UDLD in normal mode on all fiber interfaces using the udld [enable | disable]

Example:

switch(config-if)# udld enable
switch(config-if)#

Disable normal mode UDLD on all fiber ports by default using the no command.

Step 6

View the UDLD status with the show udld [ethernet slot/port | global | neighbors] command.

Example:

switch(config)# show udld
switch(config)#

Step 7

Exit interface mode.

Example:

switch(config-if-range)# exit
switch(config)#

Step 8

(Optional) Save the running configuration to startup configuration.

Example:

switch(config)# copy running-config startup-config

UDLD operates in the selected mode to provide bidirectional link detection according to your configuration.

Example

This example shows how to enable the UDLD for the device:

switch# configure terminal
switch(config)# feature udld
switch(config)#

This example shows how to set the UDLD message interval to 30 seconds:

switch# configure terminal
switch(config)# feature udld
switch(config)# udld message-time 30
switch(config)#

This example shows how to disable UDLD for Ethernet port 3/1:

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if-range)# no udld enable
switch(config-if-range)# exit

This example shows how to disable UDLD for the device:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

66

Configuring Basic Interface Parameters

Configure debounce timers for Ethernet ports

switch# configure terminal
switch(config)# no feature udld
switch(config)# exit

This example shows how to enable fiber interfaces for the aggressive UDLD mode:

switch# configure terminal
switch(config)# udld aggressive

This example shows how to enable the aggressive UDLD mode for the copper Ethernet interface3/1:

switch# configure terminal
switch(config)# interface ethernet 3
switch(config-if)# udld aggressive

This example shows how to check if aggressive mode is enabled.

switch# sh udld global

UDLD global configuration mode: enabled-aggressive
UDLD global message interval: 15
switch#

This example shows how to check if udld aggressive mode is operational for a given interface.

switch# sh udld ethernet 8/2

Interface Ethernet8/2
--------------------------------
Port enable administrative configuration setting: device-default
Port enable operational state: enabled-aggressive
Current bidirectional state: bidirectional
Current operational state: advertisement - Single neighbor detected
Message interval: 15
Timeout interval: 5
..!

Configure debounce timers for Ethernet ports

Enable the debounce timer for Ethernet ports by specifying a debounce time (in milliseconds).

Disable the timer by specifying a debounce timer value of 0.

Guidelines

• The link state of 10G and 100G ports may change repeatedly when connected to the service provider

network. As a part of link reset or break-link functionality, the Tx power light on the SFP is expected to
change to N/A state when a link state change occurs. To prevent this behavior during a link state change,
increase the link debounce timer starting at 500 ms, and then raise it in 500 ms intervals until the link
stabilizes.

• On DWDM, UVN, and WAN networks, disable automatic link suspension (ALS) whenever possible

ALS suspends the link on the WAN when the device turns off the link.

• The link debounce time and link debounce link-up time commands can only be applied to a physical

Ethernet interface.

• Use the show interface debounce command to display the debounce times for all Ethernet ports.

Support for debounce timer

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

67

Configure debounce timers for Ethernet ports

Configuring Basic Interface Parameters

• The link debounce time command is supported on 1G, 10G, 40G, 25G and 100G SFP/QSFP ports on

the Cisco Nexus 9000 series switches.

• The link debounce time is supported on 1G, 10G, 25G, 40G and 100G ports on Cisco Nexus

N9K-C9732C-FX, , N9K-X97160YC-EX, N9K-C9336C-FX2, and N9K-C93240YC-FX2 platform
switches.

• The link debounce time command is not supported on 10G and 40G ports on the Cisco Nexus

93300YC-FX and Cisco Nexus 9336C-FX switches.

The link debounce time is supported on 1G, 10G, 25G, 40G and 100G ports on Cisco Nexus
N9K-C9732C-FX, , N9K-X97160YC-EX, N9K-C9336C-FX2, and N9K-C93240YC-FX2 platform
switches.

• The link debounce time is not supported on RJ-45 ports on Cisco Nexus 9500 platform switches with

N9K-X97160TC-FX line cards.

• Beginning with Cisco NX-OS Release 10.2(3)F, the link debounce time command is supported on

N9K-C93180YC-FX3S, N9K-C93180YC-FX3, N9K-C93108TC-FX3P and N9K-X9716D-GX platform
switches.

• Beginning with Cisco NX-OS Release 10.2(3)F, the link debounce time command is supported on

these ports and platform switches.

Ports

1G

10G

25G

40G

100G

400G

Switches

Cisco Nexus , N9K-C93300YC-FX2, N9K-C93240YC-FX2, N9K-C93240YC-FX2-Z,
N9K-X97160YC-EX, N9K-C9316D-GX, N9K-C93600CD-GX, N9K-C9364C-GX,
N9K-C9232C, N9K-C93180YC-FX3S, N9K-C93180YC-FX3, N9K-C93108TC-FX3P,
and N9K-X9716D-GX

Cisco Nexus , N9K-C93300YC-FX2, N9K-C93240YC-FX2, N9K-C93240YC-FX2-Z,
N9K-X97160YC-EX, N9K-C9316D-GX, N9K-C93600CD-GX, N9K-C9364C-GX,
N9K-C9232C, N9K-C93180YC-FX3S, N9K-C93180YC-FX3, N9K-C93108TC-FX3P,
and N9K-X9716D-GX

Cisco Nexus N9K-C93300YC-FX2, N9K-C93240YC-FX2, N9K-C93240YC-FX2-Z,
N9K-X97160YC-EX, N9K-C9316D-GX, N9K-C93600CD-GX, N9K-C9364C-GX,
N9K-C9232C, N9K-C93180YC-FX3S, N9K-C93180YC-FX3, N9K-C93108TC-FX3P,
and N9K-X9716D-GX

Cisco Nexus , N9K-X9732C-FX, N9K-C9336C-FX2, N9K-C93300YC-FX2,
N9K-C93240YC-FX2, N9K-C93240YC-FX2-Z, N9K-X97160YC-EX,
N9K-C9316D-GX, N9K-C93600CD-GX, N9K-C9364C-GX, N9K-C9232C,
N9K-C93180YC-FX3S, N9K-C93180YC-FX3, N9K-C93108TC-FX3P, and
N9K-X9716D-GX

Procedure

Step 1

Enter global configuration mode.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

68

Configuring Basic Interface Parameters

Configure debounce timers for Ethernet ports

switch# configure terminal
switch(config)#

Step 2

Specify an Ethernet interface using the interface ethernet slot/port command.

Example:

switch(config)# interface ethernet 3/1
switch(config-if)#

Step 3

Set the debounce timer using the link debounce time time command.

Example:

switch(config-if)# link debounce time 1000
switch(config-if)#

time : The debounce timer time ranges from 1 to 5000 milliseconds.

When you specify 0 milliseconds, the debounce timer is disabled.

Step 4

Set the link-up timer using the link debounce link-up time command.

Example:

switch(config-if)# link debounce link-up 1000
switch(config-if)#

time :The link-up timer time ranges from 1000 to 10000 milliseconds. Use this command only if port speeds are 10G,
25G, 40G, or 100G.

The default value of the timer is 0. If the value is set to 0, the interface comes up without delay.

Note
The no link debounce link-up command also resets the value to 0.

Note
This command is supported only on Cisco Nexus N9K-X9732C-FX , N9K-C93300YC-FX, N9K-C9336C-FX2, and
N9K-X97160YC-EX switches.

Example

• The following example enables the debounce timer and sets the debounce time to 1000

milliseconds for an Ethernet interface:

switch# configure terminal
switch(config)# interface ethernet 1/4
switch(config-if)# link debounce time 1000

• The following example disables the debounce timer for an Ethernet interface:

switch# configure terminal
switch(config)# interface ethernet 1/4
switch(config-if)# link debounce time 0

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

69

Configuring Port Profiles

Configuring Basic Interface Parameters

• The following example sets the debounce link-up timer to 1000 milliseconds for an Ethernet

interface:

switch# configure terminal
switch(config)# interface ethernet 1/4
switch(config-if)# link debounce link-up time 1000

Configuring Port Profiles

You can apply several configuration parameters to a range of interfaces simultaneously. All the interfaces in
the range must be the same type. You can also inherit the configurations from one port profile into another
port profile. The system supports four levels of inheritance.

Create a port profile

You can create a port profile on the device.

Each port profile must have a unique name within its type and the network.

Note

Use only these characters in port profile names.

• Lowercase letters (a–z)

• Uppercase letters (A–Z)

• Numbers (0–9)

• Use only these special characters.

• .

• -

• _

Purpose

Procedure

Command or Action

Step 1

Enter global configuration mode.

Example:

switch# configure terminal

Step 2

Create and name the port profile for the desired interface
type using the port-profile [type {ethernet |
interface-vlan | port-channel}] name

Example:

switch(config)# port-profile type ethernet test

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

70

Configuring Basic Interface Parameters

Enter port-profile configuration mode

Command or Action

Purpose

Step 3

Exit the port-profile configuration mode.

Example:

switch(config-ppm)# exit

Step 4

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 5

(Optional) Save the running configuration to the startup
configuration.

Example:

switch# copy running-config startup-config

Example

This example shows how to create a port profile named test for ethernet interfaces.

switch# configure terminal
switch(config)# port-profile type ethernet test
switch(config-ppm)#

Enter port-profile configuration mode

Enter port-profile configuration mode to to add, remove, or modify or create a port profile.

Complete these steps to enter port-profile configuration mode.

Purpose

You can add or remove configurations in the profile.

Procedure

Command or Action

Step 1

Enter global configuration mode.

Example:

switch# configure terminal

Step 2

Create and name the port profile for the desired interface
type using the port-profile [type {ethernet |
interface-vlan | port-channel}] name command.

Example:

switch(config)# port-profile type ethernet test

Step 3

Exit the port-profile configuration mode.

Example:

switch(config-ppm)# exit

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

71

Assign a port profile to a range of interfaces

Configuring Basic Interface Parameters

Command or Action

Purpose

Step 4

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 5

(Optional) Save the running configuration to the startup
configuration.

Example:

switch# copy running-config startup-config

Example

This example shows how to enter the port-profile configuration mode for the specified port profile
and bring all the interfaces administratively up:

switch# configure terminal
switch(config)# port-profile type ethernet test
switch(config-ppm)# no shutdown
switch(config-ppm)#

Assign a port profile to a range of interfaces

Assign a port profile to multiple interfaces at one time to simplify configuration management.

Use this task when you need to apply the same port profile to several interfaces of the same type on a switch.
All the interfaces must be of the same type.

To assign a port profile to a range of interfaces, use these steps

Before you begin

Ensure all target interfaces are the same type (for example, all Ethernet interfaces).

Purpose

Procedure

Command or Action

Step 1

Enter the global configuration mode.

Example:

switch# configure terminal

Step 2

Select the interfaces you want to configure using the
interface [ethernet slot/port | interface-vlan vlan-id |
port-channel number] command.

Example:

switch(config)# interface ethernet7/3-5,
ethernet10/2, ethernet11/20-25

Step 3

Assign the port profile to the selected interfaces.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

72

Configuring Basic Interface Parameters

Enable a specific port profile

Command or Action

Example:

switch(config-if)# inherit port-profile adam

Purpose

Step 4

Exit configuration mode.

Example:

switch(config-if)# exit

Step 5

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 6

(Optional) Save your changes by copying the running
configuration to the startup configuration.

Example:

switch# copy running-config startup-config

The specified port profile is applied to all selected interfaces,

Example

This example shows how to assign the port profile named adam to Ethernet interfaces 7/3 to 7/5,
10/2, and 11/20 to 11/25:

switch# configure terminal
switch(config)# interface ethernet7/3-5, ethernet10/2, ethernet11/20-25
switch(config-if)# inherit port-profile adam
switch(config-if)#

Enable a specific port profile

Apply the configurations specified in a port profile to selected interfaces by enabling that port profile.

Enabling a port profile activates configuration inheritance on targeted interfaces. If multiple port profiles are
inherited, only the last inherited profile must be enabled, as the system assumes underlying profiles are enabled.

You must be in the port-profile configuration mode to enable or disable port profiles.

To apply the port-profile configurations to the interfaces, use these steps.

Before you begin

You must enter port-profile configuration mode before you can enable or disable port profiles.

Procedure

Command or Action

Step 1

Enter the global configuration mode.

Example:

Purpose

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

73

Inherit a port profile

Configuring Basic Interface Parameters

Command or Action
switch# configure terminal

Purpose

Step 2

Create and name a port profile for the desired interface, and
enter port-profile configuration mode using the port-profile
[type {ethernet | interface-vlan | port-channel}] name
command.

Example:

switch(config)# port-profile type ethernet test

Step 3

Enable the port profile to apply the port-profile
configurations to the interfaces.

Example:

switch(config-ppm)# state enabled

Step 4

Exit the port-profile configuration mode.

Example:

switch(config-ppm)# exit

Step 5

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 6

(Optional) Save your running configuration to the startup
configuration.

Example:

switch# copy running-config startup-config

When you enable the specified port profile, its configurations take effect on the designated interfaces.

Example

This example shows how to enter the port-profile configuration mode and enable the port profile:

switch# configure terminal
switch(config)# port-profile type ethernet test
switch(config-ppm)# state enabled
switch(config-ppm)#

Inherit a port profile

Configure an existing port profile to automatically inherit settings from another port profile.

Use this task to enable an existing port profile to inherit settings from another profile. The system supports
four levels of inheritance.

Before you begin

Ensure the profile you wish to inherit from already exists

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

74

Configuring Basic Interface Parameters

Inherit a port profile

Purpose

Procedure

Command or Action

Step 1

Enter the global configuration mode.

Example:

switch# configure terminal

Step 2

Enter the port-profile configuration mode for the desired
port profile using the port-profile name command.

Example:

switch(config)# port-profile test

Step 3

Use the inherit port-profile name command to inherit
another profile’s settings.

The original port profile assumes all the configurations of
the inherited port profile.

Example:

switch(config-ppm)# inherit port-profile adam

Step 4

Exit the port-profile configuration mode.

Example:

switch(config-ppm)# exit

Step 5

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 6

(Optional) Save the running configuration to the startup
configuration.

Example:

switch# copy running-config startup-config

"The port profile now inherits all settings from the specified profile.

Example

This example shows how to inherit the port profile named adam onto the port profile named test:

switch# configure terminal
switch(config)# port-profile test
switch(config-ppm)# inherit port-profile adam
switch(config-ppm)#

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

75

Remove a port profile from a range of interfaces

Configuring Basic Interface Parameters

Remove a port profile from a range of interfaces

Remove an assigned port profile from one or more interfaces. This action reverts those interfaces to their
default configuration or allows you to assign a different profile.

You can remove a port profile from interfaces where the profile has been applied. Use interface configuration
mode for this procedure.

Remove the port profile from a range of interfaces by completing these steps.

Before you begin

Identify the interfaces from which you need to remove the port profile.

Procedure

Command or Action

Step 1

Enter the global configuration mode.

Example:

switch# configure terminal

Purpose

Step 2

Select the range of interfaces using the interface [ethernet
slot/port | interface-vlan vlan-id | port-channel number]
command.

Example:

switch(config)# interface ethernet 7/3-5, 10/2,
11/20-25

Step 3

Remove the port profile from the selected interfaces using
the no inherit port-profile name command.

Example:

switch(config-if)# no inherit port-profile adam

Step 4

Exit the configuration mode.

Example:

switch(config-if)# exit

Step 5

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 6

(Optional) Save the running configuration to the startup
configuration.

Example:

switch# copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

76

Configuring Basic Interface Parameters

Remove an inherited port profile

The specified port profile is removed from the selected interfaces.

Example

This example shows how to unassign the port profile named adam to Ethernet interfaces 7/3 to 7/5,
10/2, and 11/20 to 11/25:

switch# configure terminal
switch(config)# interface ethernet 7/3-5, 10/2, 11/20-25
switch(config-if)# no inherit port-profile adam
switch(config-if)#

Remove an inherited port profile

Remove an inherited port profile from a specific port profile in the switch configuration.

Perform this task when you need to disassociate a port profile from inheriting settings from another port
profile. This action helps you change or restrict inherited configuration parameters.

Procedure

Command or Action

Step 1

Enter the global configuration mode.

Example:

switch# configure terminal

Purpose

Step 2

Enter the port-profile configuration mode for the desired
port profile using the port-profile name command.

Example:

switch(config)# port-profile test

Step 3

Remove the inherited port profile using the no inherit
port-profile name command.

Example:

switch(config-ppm)# no inherit port-profile adam

Step 4

Exit the port-profile configuration mode.

Example:

switch(config-ppm)# exit

Step 5

(Optional) Verify the port-profile configuration.

Example:

switch# show port-profile

Step 6

(Optional) Save the running configuration to the startup
configuration.

Example:

switch# copy running-config startup-config

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

77

Configure a link MAC-up timer on DWDM or Dark fiber circuits

Configuring Basic Interface Parameters

Command or Action

Purpose

The specified port profile no longer inherits settings from the designated port profile.

Example

This example shows how to remove the inherited port profile named adam from the port profile
named test.

switch# configure terminal
switch(config)# port-profile test
switch(config-ppm)# no inherit port-profile adam
switch(config-ppm)#

Configure a link MAC-up timer on DWDM or Dark fiber circuits

DWDM and dark fiber links sometimes require adjustment of the MAC-up timer. This adjustment ensures
reliable detection of link events. Setting a specific timer can prevent false link flaps.

This procedure describes how to configure MAC-up timers on DWDM or dark fiber circuits.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Select the interface for the DWDM or dark fiber circuit using the interface type slot/port

Example:

switch(config)# interface ethernet1/2
switch(config-if)#

Step 3

Set the link MAC-up timer using the link mac-up timer seconds

Example:

switch(config-if)# link mac-up timer 10

The link MAC-up timer range is 0-120.

Note
Configure this setting only on DWDM or dark fiber links.

The link MAC-up timer is configured for the selected interface, enabling optimized performance and improved
reliability for DWDM or dark fiber circuits.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

78

Configuring Basic Interface Parameters

Configuring 25G Autonegotiation

Configuring 25G Autonegotiation

Autonegotiation allows devices to advertise enhanced modes of operation it possesses via the link segment
and to detect corresponding enhanced operational modes that the other devices may be advertising.
Autonegotiation provides the means to exchange information between two devices that share a link segment
and to automatically configure both devices to take maximum advantage of their abilities.

Guidelines and Limitations for 25G Autonegotiation

•
• Autonegotiation of 25G interfaces is disabled by default

• Copper-based 25G transceivers require autonegotiation. Enable the command negotiate auto 25000

under a copper 25G interface. The interface may remain down if this parameter is mismatched between
each end of the link.

• Autonegotiation is not supported on 25G breakout ports.

FEC selection with 25G Autonegotiation

Table9:FECSelectionwith25GAutonegotiation

Hardware

FEC based on CR Lengths

1m

N9K-C93240YC-FX2

No FEC

N9K-C93180YC-FX

No FEC

N9K-X97160YC-EX

No FEC

2m

No FEC

No FEC

No FEC

3m

FC-FEC

FC-FEC

FC-FEC

5m

RS-IEEE

RS-IEEE

FC-FEC

Enable Autonegotiation on interfaces

Autonegotiation allows interfaces to automatically select the best speed and duplex mode. You must configure
autonegotiation at both ends of a 25G native link.

You can enable autonegotiation using the negotiate auto command.

To enable autonegotiation, use these steps.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal

switch(config)#

Step 2

Select the interface using the interface ethernet port number command.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

79

Configuring Basic Interface Parameters

Disable Autonegotiation on the interfaces

switch# interface e1/7
switch(config-if)#

Step 3

Enable autonegotiation on the interface using the negotiate auto port speed command.

Example:

switch(config-if)# negotiate auto 25000

switch(config-if)#

Note
Apply this command to interfaces on both ends of the 25G native link.

Autonegotiation is enabled on the selected interface.

Example

This example shows how to enable autonegotiation on a specified interface.

switch# show interface e1/7 st

--------------------------------------------------------------------------------

Port

Name

Status

Vlan

Duplex Speed

Type

--------------------------------------------------------------------------------
25G

connected routed

Eth1/7

full

--

SFP-H25GB-CU1M

switch# conf
switch(config)# int e1/7
switch(config-if)# negotiate auto 25000

Disable Autonegotiation on the interfaces

You can disable autonegotiation using the no negotiate auto command. To disable autonegotiation, use these
steps.

Procedure

Step 1

Enter global configuration mode.

Example:

switch# configure terminal

switch(config)#

Step 2

Select the interface using the interface ethernet port number command.

Example:

switch# int e1/7
switch(config-if)#

Step 3

Disable autonegotiation at the interface using the no negotiate auto port speed command.

Example:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

80

Configuring Basic Interface Parameters

Commands for viewing basic interface parameters

switch(config-if)# no negotiate auto 25000
switch(config-if)#

Note
You must run this command on both ends of the link for proper operation.

Autonegotiation is disabled on the configured interface. The interface operates at the speed you specified.

Example

This example shows how to disable autonegotiation on an interface.

switch# sh int e1/7 st

--------------------------------------------------------------------------------

Port

Name

Status

Vlan

Duplex Speed

Type

--------------------------------------------------------------------------------
25G

connected routed

Eth1/7

full

--

SFP-H25GB-CU1M

switch# conf
switch(config)# int e1/7
switch(config-if)# no negotiate auto 25000

Commands for viewing basic interface parameters

You can verify the basic interface parameters by displaying their values. You can also clear the counters listed
when you display the parameter values.

These commands display information about basic interface parameters and states.

Command

show cdp all

Purpose

Displays the CDP status.

show interface interface

Displays the configured states of one or all interfaces.

show interface brief

Displays a table of interface states.

show interface status err-disabled

Displays information about error-disabled interfaces.

show udld interface

Displays the UDLD status for the current interface or
all interfaces.

show udld global

Displays the UDLD status for the current device.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

81

Monitor interface counters

Configuring Basic Interface Parameters

Monitor interface counters

An interface counter is a network monitoring metric that

• records statistics about data packets and errors on a network interface,

• assists network administrators in identifying and troubleshooting network problems, and

• enables performance tracking and capacity planning.

Additional information

Interface counters track input and output packets, errors, discards, and other events per interface. They are
essential for diagnosing network issues and for analyzing traffic patterns over time.

You can display and clear interface counters using Cisco NX-OS.

Configure sampling intervals for statistics

Sampling intervals allow you to customize how frequently the switch collects statistics for traffic monitoring.

You can set up to three sampling intervals for statistics collections on interfaces. Use these steps to configure
interface statistic sampling intervals.

Procedure

Step 1

Enter global configuration mode. configure terminal

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the interface interface using the interface ethernet slot/port command.

Example:

switch(config)# interface ethernet 4/1
switch(config)#

Step 3

Configure one or more sampling intervals for bitrate and packet rate statistics using the load-interval counters [1 | 2 |
3] seconds command.

Example:

switch(config)# load-interval counters 1 100
switch(config)#

Each counter uses these default values.

• 1: 30 seconds (60 seconds for VLAN)

• 2: 300 seconds

• 3: Not configured.

Step 4

(Optional) View the interface statistics using the show interface interface command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

82

Configuring Basic Interface Parameters

Clear the interface counters

Example:

switch(config)# show interface ethernet 2/2
switch#

Step 5

Exit interface mode.

Example:

switch(config-if-range)# exit
switch(config)#

Step 6

(Optional) Save the running configuration to startup configuration.

Example:

switch(config)# copy running-config startup-config

The specified interface now collects traffic statistics using the configured sampling intervals.

Example

This example shows how to set the three sample intervals for the Ethernet port 3/1:

switch# configure terminal
switch(config)# interface ethernet 3/1
switch(config-if)# load-interval counter 1 60
switch(config-if)# load-interval counter 2 135
switch(config-if)# load-interval counter 3 225
switch(config-if)#

Clear the interface counters

You can clear the Ethernet and management interface counters by using the clear counters interface
command. Perform this task from either configuration mode or interface configuration mode.

Procedure

Step 1

Clear the interface counters on the interface using the clear counters interface [all | ethernet slot/port | loopback
number | mgmt number | port channel channel-number] command.

Example:

switch# clear counters ethernet 2/1
switch#

Step 2

(Optional) Verify the interface status using the show interface interface command.

Example:

switch# show interface ethernet 2/1
switch#

Step 3

Verify that interface counters are reset using the show interface [ethernet slot/port | port channel channel-number]
counters command.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

83

Example: Configuring QSA on Cisco Nexus 9396PX switch

Configuring Basic Interface Parameters

Example:

switch# show interface ethernet 2/1 countersswitch#

The system resets the interface counter statistics for the specified interfaces.

Example

This example shows how to clear the counters on Ethernet port 5/5:

switch# clear counters interface ethernet 5/5
switch#

Example: Configuring QSA on Cisco Nexus 9396PX switch

• Using the default configuration on port 2/1, all the QSFPs in port group 2/1-6 are brought up with a speed

of 40G. If there are any QSA modules in port group 2/1-6, they are error disabled.

• Using the speed-group [ 10000 | 40000] command to configure port 2/7, all the QSAs in port group

2/7-12 are brought up with a speed of 10G or 40G. If there are any QSFP modules in port group 2/7-12,
they are error disabled.

This example shows how to configure QSA for the first port in the speed group for a Cisco Nexus 9396PX:

switch# conf terminal
switch(config)# interface ethernet 2/7
switch(config-if)# speed-group 10000

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

84

