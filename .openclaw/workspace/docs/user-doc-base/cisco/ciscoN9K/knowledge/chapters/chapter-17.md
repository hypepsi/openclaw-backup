# Chapter 17


Configuring 400G Digital Coherent Optics

This chapter describes the 400G Digital Coherent QSFP-DD optical modules and their supported configurations.

• 400G Digital Coherent Optics Overview, on page 431
• 400G Digital Coherent Optics Parameters, on page 432
• Traffic Configuration Parameters, on page 434
• Guidelines and Limitations for 400G Digital Coherent Optics, on page 435
• Configuring 400G Digital Coherent Optics on ZR Module, on page 439
• Configuring 400G Digital Coherent Optics on ZRP Module, on page 440
• Configuring Breakout, on page 442
• Configure Transceiver Auto Squelch, on page 443
• Configure Transceiver Loopback, on page 444
• Configure Transceiver Performance Monitoring, on page 445
• Configure Transceiver Alarms, on page 448
• Verifying 400G Digital Coherent Optics, on page 450
• Configuration Examples for 400G Coherent Optics, on page 450
• Upgrade firmware on ZR optics, on page 453
• Overview of Optical Line System - Pluggable Support for QSFP-DD, on page 455
• Benefits, on page 456
• Supported Platforms, on page 457
• Guidelines and Limitations, on page 457
• Configuring amplifier control mode, on page 473
• Configuring the gain control mode, on page 474
• Configuring the power control mode, on page 474
• Configuring the power reduction mode, on page 475
• Configuring the Optical Safety Remote Interlock (OSRI) mode, on page 475
• Configuring the safety control mode, on page 476
• Verify OLS configuration, on page 477

400G Digital Coherent Optics Overview

Coherent optics uses phase and amplitude to encode data, unlike PAM4 optics (Pulse amplitude modulation)
which only uses amplitude. This allows coherent optics to be more resistant to noise and support long-haul
distance transmission.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

431

400G Digital Coherent Optics Parameters

Configuring 400G Digital Coherent Optics

For more information on Cisco 400G Digital Coherent Optics, see Cisco 400G Digital Coherent Optics
QSFP-DD Optical Modules Data Sheet.

There are two variants of 400G Digital Coherent Optics.

• ZR variant: The QSFP-DD ZR variant complies with OIF MSA, allowing to provide compatibility with
the equivalent component compliant with the same MSA standard. The key application for the ZR standard
is allowing the transmission of a 400G wavelength in point-to-point topology up to a distance of 120
km.

• ZR Plus variant: The QSFP-DD OpenZR+ module complies with the OpenZR+ MSA. ZR+ pluggable
coherent optics support regional to long-haul transmission of wavelengths with multiple amplification
sites between endpoints. ZR+ supports multiple configuration options in terms of modulation scheme,
shaping, and baud rates to support different network topologies and allows longest transmission distance
(> 120 km).

400G Digital Coherent Optics Parameters

400G Digital Coherent Optics is configurable and allows configuration for the following parameters on the
optics. For more information on configuration values, see Table 22: 400G Digital Coherent QSFP-DD Traffic
Configuration Values, on page 433:

• Transponder/Muxponder mode: This parameter is used to configure a media line at 400G and have

maximum 4 clients on a host side.

• DAC rate: Digital Analog Conversion (DAC) parameter is used to set oversample (pulse shape enable

or disable) and media line modem to Standard (S) or Enhanced (E).

• FEC mode: Forward Error Correction (FEC) supports cFEC or oFEC modes on a media line and is used

for controlling errors during data transmission.

• Modulation: This parameter is used to control an optical wave or to encode information on a carrier

optical wave. Supported modulations are 16 QAM, 8 QAM, and QPSK.

• CD min/max: Chromatic Dispersion (CD) is a phenomenon that is an important factor in fiber optic

communications. It is the result of the different colors, or wavelengths, in a light beam arriving at their
destination at slightly different times. This parameter is used to set range for the device to get good optical
signal and frequency.

Muxponder-FEC-Modulation

CD default High
(ps/nm)

CD default Low
(ps/nm)

Max
provisionable CD
High (ps/nm)

Min.
provisionable CD
Low (ps/nm)

400G-400GZR-cFEC-16QAM

2400

400G-400GZR-oFEC-16QAM

13000

200G-200GZR-oFEC-QPSK

50000

200G-200GZR-oFEC-8QAM

26000

200G-200GZR-oFEC-16QAM

21000

100G-100GZR-oFEC-QPSK

80000

-2400

-13000

-50000

-26000

-21000

-80000

2400

52000

100000

100000

85000

160000

-2400

-52000

-100000

-100000

-85000

-160000

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

432

Configuring 400G Digital Coherent Optics

400G Digital Coherent Optics Parameters

• Tx power: The transmitted optical power refers to the output optical power of the light source at the

transmitting end of the optical module, and the received optical power refers to the input optical power
of the light source at the receiving end of the optical module.

Each optical module has its own transmitting (TX) power range. You can change the transmitting (TX)
power value based on the module capability.

Optical
Module

Trunk
Speed1,3

Optical
Transmit
Power (Tx)
Shaping

QDD-400G-ZR-S

400G

QDD-400G-ZRP-S

400G

QDD-400G-ZRP-S

200G

QDD-400G-ZRP-S

100G

No

Yes

Yes

Yes

1

1

1

1

Interval

Supported Range of Optical Transmit Power
(Tx) Values (in units of 0.1dBm)2

Minimum
Value

Maximum
Typical
Value

Maximum
Worst
CaseValue

-150

-150

-150

-150

-100

-110

-90

-59

-100

-130

-105

-75

• Frequency: In fiber-optic communications, wavelength-division multiplexing (WDM) is a technology
which multiplexes several Optical Carrier signals onto single optical fiber by using different wavelengths
(i.e., colors) of laser light. This technique enables bidirectional communications over a single strand of
fiber, also called wavelength-division duplexing, and multiplication of capacity. This parameter is used
to set any frequency on ITU C-BAND table. For more information on the values, see ITU C-BAND
table, on page 485 section.

For more information on configuration, see Configuring 400G Digital Coherent Optics on ZR Module,
on page 439 section.

The following table contains the possible traffic configuration values for the 400G Digital Coherent QSFP-DD
optical modules, in the Transponder (TXP) and Muxponder (MXP) mode:

Table22:400GDigitalCoherentQSFP-DDTrafficConfigurationValues

Client Speed

Trunk Speed

Frequency

FEC

Modulation

DAC Rate

QDD-400G-ZR-S Transponder and Muxponder Configuration Values

1 client, 400G
speed

1 trunk, 400G

C-Band, 196.1
To 191.3 THz

cFEC

16 QAM

1x1

QDD-400G-ZRP-S Transponder and Muxponder Configuration Values

1 trunk, 400G
speed

C-Band, 196.1
To 191.3 THz

cFEC

16 QAM

1x1

1X400GA

UI-8

4X100GA

UI-2

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

433

Traffic Configuration Parameters

Configuring 400G Digital Coherent Optics

Client Speed

Trunk Speed

Frequency

FEC

Modulation

DAC Rate

1X400GA

UI-8

4X100GA

UI-2

1X400GA

UI-8

4X100GA

UI-2

1X400GA

UI-8

4X100GA

UI-2

1X400GA

UI-8

4X100GA

UI-2

1X400GA

UI-8

4X100GA

UI-2

2X100GA

UI-2

100G

1 trunk, 400G
speed

C-Band, 196.1
To 191.3 THz

cFEC

16 QAM

1x1.5

1 trunk, 400G
speed

C-Band, 196.1
To 191.3 THz

oFEC

16 QAM

1x1.25

1 trunk, 400G
speed

C-Band, 196.1
To 191.3 THz

oFEC

16 QAM

1x2

1 trunk, 400G
speed

C-Band, 196.1
To 191.3 THz

oFEC

16 QAM

1x1

1 trunk, 400G
speed

C-Band, 196.1
To 191.3 THz

oFEC

16 QAM

1x1.5

1 trunk, 200G
speed

C-Band, 196.1
To 191.3 THz

oFEC

1 trunk, 100G
speed

C-Band, 196.1
To 191.3 THz

oFEC

QPSK

QPSK

QPSK

1x1.5

1

1x1.5

Traffic Configuration Parameters

The following table displays the different traffic configuration supported:

TXP/MXP

Client

Trunk

Modulation

FEC

DAC Rate

400G-TXP

400G-TXP

1 Client, 400G
speed

1 trunk, 400G
speed

1 Client, 400G
speed

1 trunk, 400G
speed

16 QAM

oFEC

1x1,1x1.25,
1x1.5 and 1x2

16 QAM

cFEC

1x1, and 1x1.5

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

434

Configuring 400G Digital Coherent Optics

Guidelines and Limitations for 400G Digital Coherent Optics

TXP/MXP

Client

Trunk

Modulation

FEC

DAC Rate

4x100G- MXP

4 clients, 100G
speed

1 trunk, 400G
speed

16 QAM

oFEC

1x1, 1x1.25,
1x1.5, and 1x2

4x100G- MXP

4 clients, 100G
speed

1 trunk, 400G
speed

2x100G-MXP

2 clients, 100G
speed

1 trunk, 200G
speed

16 QAM

cFEC

1x1, and 1x1.5

oFEC

1x1, and 1x1.5

QPSK

8 QAM

16 QAM

1x1.25

1x1.25

1x1.5

1x100G-MXP

1 client, 100G
speed

1 trunk, 100G
speed

QPSK

oFEC

Note

• ZR supports only 1x400G transponder.

• ZR supports only 1x1 DAC rate.

• For configuring 4x100, and 2x100 muxponder, you need to perform interface breakout prior to ZRP

configuration. For more information, see Configuring Breakout, on page 442 section.

Guidelines and Limitations for 400G Digital Coherent Optics

The 400G Digital Coherent Optics has the following guidelines and limitations:

• Beginning with Cisco NX-OS Release 10.4(1)F, 400G Digital Coherent Optics (DCO) support is provided

on Cisco Nexus 9300-GX2 and 9408 platform switches.

• Beginning with Cisco NX-OS Release 10.4(2)F, QDD-400G-ZR-S and QDD-400G-ZRP-S optics support

is provided on the following switches and line cards:

• Cisco Nexus 93600CD-GX, 9316D-GX switches and Cisco Nexus 9508/9504 switches with

X9716D-GX line cards.

• Cisco Nexus 9804/9808 switches with Cisco Nexus X98900CD-A and X9836DM-A line cards.

• The 1x100G transponder and 2x100G muxponder modes are not supported on Cisco Nexus 93600CD-GX,

9316D-GX switches and Cisco Nexus X98900CD-A and X9836DM-A line cards.

• QDD-400G-ZR-S optics doesn’t support interface breakout.

• QDD-400G-ZRP-S optics supports interface breakout. There are multiple breakouts maps supported for

ZRP optics.

• Use the breakout map 100g-2x-pam4 option for the 2x100 breakout interface.

• For better system stability and efficiency, it is recommended to avoid frequent insertion and removal of
DCO. For OIR, you must wait for at least one minute between back-to-back transceiver insertion and
removal.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

435

Guidelines and Limitations for 400G Digital Coherent Optics

Configuring 400G Digital Coherent Optics

• The optics maximum link-up time for the ZR/ZRP module can be up to 180 seconds.

• To recover any Coherent optics port or MACsec port affected because of power restrictions, you must
disable an active ZR/ZRP port, or unconfigure an existing MACsec session, and flap the affected port.

Note

N9K-C9332D-H2R switch does not have any limitation on number of MACSec
sessions.

• For some of the platforms, there is hardware power limitation due to which there is restriction on usage

of the number of 400Gig-ZR/ZRP transceivers and MACsec configurations together.

• Beginning with Cisco NX-OS Release 10.4(2)F, the 2X100 muxponder supports 8QAM and 16QAM

modulation.

• Beginning with Cisco NX-OS Release 10.4(3)F, the following transceivers are supported on Cisco Nexus

C93400LD-H1 and N9K-C9332D-H2R switch:

• QDD-400G-ZRP-S

• QDD-400G-ZR-S

Note

On N9K-C93400LD-H1, QDD-400G-ZRP-S and QDD-400G-ZR-S transceivers
can be inserted in either odd or even numbered ports. However, on
N9K-C9332D-H2R switch, the QDD-400G-ZRP-S and QDD-400G-ZR-S
transceivers must be inserted in odd numbered ports only. Inserting these
transceivers to even numbered ports puts the port into error state due to hardware
thermal limitation.

• Beginning with Cisco NX-OS Release 10.4(3)M, these commands are introduced.

• zr-optics frequency command allows you to set the frequency of ZR optics modules on Cisco

Nexus 9000 switches for optimal performance in DWDM systems.

• transceiver auto-squelch command helps you to manage signal integrity automatically by controlling

the squelch functionality of optical transceivers

• transceiver loopback command allows you to configure loopback modes on optical transceivers

on Cisco devices

• transceiver performance-monitoring enables performance monitoring for optical transceivers on

Cisco devices

• transceiver alarms command allows you to configure alarms on optical transceivers on Cisco

devices

• Beginning with Cisco NX-OS Release 10.5(3)F, transceiver auto-squelch command helps you to manage

signal integrity automatically by controlling the squelch functionality of optical transceivers.

• Beginning with Cisco NX-OS Release 10.5(3)F, the output of the show interface interface transceiver
details command also includes the details regarding the major and minor versions of the firmware for
the 400G Digital Coherent Optics.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

436

Configuring 400G Digital Coherent Optics

Guidelines and Limitations for 400G Digital Coherent Optics

• Beginning with Cisco NX-OS Release 10.6(1)F, TPMON with performance monitoring data is supported

on the following Cisco Nexus platforms:

• N9K-C9348D-GX2A

• N9K-C9364D-GX2A

• N9K-C9332D-GX2B

• N9K-C9408

• N9K-C93600CD-GX

• N9K-C9316D-GX

• N9K-C9804, N9K-C9808

Performance monitoring data is supported only on the following optics/transceiver types:

• QSFP-DD-400G-ZR-S

• QSFP-DD-400G-ZRP-S

• DP04QSDD-HE0

• Performance monitoring can be enabled on any interface, but historical data is only collected for

the above-listed optics/transceivers.

• Only the following fixed bucket intervals are supported for performance data: 30-second, 15-minute,

and 24-hour. User-configurable intervals are not supported.

• TPMON retains performance data for 33 intervals of 30 seconds, 33 intervals of 15 minutes, and 2

intervals of 24 hours.

• All performance monitoring data is lost upon a TPMON process restart or switch reload. Only the

configuration persists after these events.

• You can use the clear counters interface transceiver performance-monitoring history command
without specifying an interval to simultaneously clear all historical data for 30-second, 15-minute,
and 24-hour buckets.

• Beginning with NX-OS Release 10.6(2)F, ZR, ZRP and Bright ZR firmware upgrade is supported on

9300-GX2 TOR, and N9K-X9836DM-A and N9K-X98900CD-A line cards.

• For DP04QSDD-HE0

• From Release 10.4(3)F, DP04QSDD-HE0 is supported only in 1x400 and 1x100 mux ponder modes
on GX/GX2 platform and X98900CD-A and X9836DM-A line cards, with the following dac rates.

• dac_rate 1x1_50 with CFEC

• dac_rates 1x1_25 and 1x1_50 with OFEC mode

• The optics maximum link-up time can be up to 240 seconds.

• From Cisco NX-OS Release 10.5(1)F, DP04QSDD-HE0(Bright-ZR) is supported in 4x100 and
2x100 mux ponder modes on GX/GX2 platform and X98900CD-A and X9836DM-A line cards.

• The restrictions are as summarized below:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

437

Guidelines and Limitations for 400G Digital Coherent Optics

Configuring 400G Digital Coherent Optics

• For Cisco Nexus 9364D-GX2A:

• When system has 9 or more MACsec sessions configured and no ZR/ZRP transceiver is present,
inserting a ZR/ZRP transceiver disables the corresponding port. The maximum number of
MACsec sessions allowed is 16 when no ZR/ZRP transceiver is present.

• When system has 9 or more ZR/ZRP transceivers in active state and no MACsec session exists,
bringing-up of a new MACsec session will fail. The maximum number of active ZR/ZRP
transceivers is 13 when no MACsec session is present in the system. Inserting a 14th ZR/ZRP
transceiver disables the corresponding port.

• When both MACsec sessions and active ZR/ZRP transceivers coexist, the combined limit is
up to 8 MACsec session and up to 8 ZR/ZRP transceivers. Configuring the 9th MACsec session
or adding the 9th active ZR/ZRP will disable the corresponding port.

• The ZR/ZRP transceivers are supported only on the odd numbered front ports of this platform.
Inserting a ZR/ZRP transceiver into an even numbered front port puts the port into error state.

• For Cisco Nexus 9332D-GX2B:

• When system has 5 or more MACsec sessions configured and no active ZR/ZRP transceiver
is present, adding a ZR/ZRP transceiver disables the corresponding port. The maximum number
of MACsec sessions allowed is 8 when no active ZR/ZRP transceiver is present. Configuring
a 9th MACsec session disables the corresponding port.

• When system has 5 or more active ZR/ZRP transceivers inserted and no MACsec session exists,
bringing-up of a new MACsec session will fail. The maximum number of active ZR/ZRP
transceivers is 8 when no MACsec session is present in the system. Inserting a 9th ZR/ZRP
transceiver disables the corresponding port.

• When both MACsec sessions and active ZR/ZRP transceivers coexist, the combined limit is
up to 4 MACsec session and up to 4 active ZR/ZRP transceivers. Configuring the 5th MACsec
session or inserting the 5th ZR/ZRP disables the corresponding port.

• The ZR/ZRP transceivers are supported on any of the front ports of this platform.

• For Cisco Nexus 9348D-GX2A:

• The ZR/ZRP transceivers are supported on the following 24 front ports of this platform:

• 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 26, 29, 32, 35, 38, 41, 44, 47

Note

Inserting ZR/ZRP transceivers to other front ports that are not in the above list
puts the port into error state.

• For Cisco Nexus 9408:

• System can support up to 32 active ZR/ZRP transceivers irrespective of whether the MACsec

configuration is present or not.

• The ZR/ZRP transceivers are supported on only the Cisco Nexus X9400-8D module.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

438

Configuring 400G Digital Coherent Optics

Configuring 400G Digital Coherent Optics on ZR Module

Configuring 400G Digital Coherent Optics on ZR Module

You can configure the coherent optics on the ZR module for DAC rate, muxponder mode, modulation, and
FEC parameters.

Before you begin

Ensure that the following points are taken care during DCO configuration:

• Without insertion of ZR optics, the coherent optics configuration will not work.

• When we configure specific zr-optics on the ZRP module, the coherent configuration will not work.

• When we configure specific zrp-optics on the ZR module, the coherent configuration will not work.

SUMMARY STEPS

1. configure terminal
2.
3.
4.
5.
6.

interface ethernet {type slot/port}
[no] zr-optics fec fec_val muxponder mxp_val modulation mod_val dac-rate dr_val
(Optional) zr-optics cd-min cd_min cd-max cd_max
(Optional) zr-optics transmit-power tx_pwr
(Optional) zr-optics dwdm-carrier [ 100MHz-grid frequency freq_100mhz_val | 100GHz-grid frequency
freq_100ghz_val | 50GHz-grid { frequency freq | itu-channel itu-chan | wavelength wavelen}]
(Optional) [no] zr-optics frequency frequency-value

7.

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

interface ethernet {type slot/port}

Example:

switch(config)# interface ethernet 1/3
switch(config-if)#

Step 3

[no] zr-optics fec fec_val muxponder mxp_val modulation
mod_val dac-rate dr_val

Example:

switch(config-if)# zr-optics fec cFEC muxponder
1x400 modulation 16QAM dac-rate 1x1

Specifies an interface to configure, and enters interface
configuration mode.

Configures the following parameters on ZR optics. For
more information, see 400G Digital Coherent Optics
Parameters, on page 432 section:

• FEC

• Muxponder

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

439

Configuring 400G Digital Coherent Optics on ZRP Module

Configuring 400G Digital Coherent Optics

Command or Action

Purpose

• Modulation

• DAC

Step 4

(Optional) zr-optics cd-min cd_min cd-max cd_max

Example:

switch(config-if)# zr-optics cd-min -2300 cd-max
2300

Step 5

(Optional) zr-optics transmit-power tx_pwr

Example:

switch(config-if)# zr-optics transmit-power -190

Step 6

(Optional) zr-optics dwdm-carrier [ 100MHz-grid
frequency freq_100mhz_val | 100GHz-grid frequency
freq_100ghz_val | 50GHz-grid { frequency freq |
itu-channel itu-chan | wavelength wavelen}]

Example:

switch(config-if)# zr-optics dwdm-carrier
100MHz-grid frequency 1913000

Step 7

(Optional) [no] zr-optics frequency frequency-value

Example:

Configures chromatic dispersion on coherent optics with
set minimum and maximum values. For more information,
see 400G Digital Coherent Optics Parameters, on page 432
section.

Note
When you configure the maximum and minimum values
of CD for any data rate, ensure that the minimum difference
between the configured values is equal to or greater than
1000 ps/nm.

Sets the transmit power of the optical signal. For more
information, see 400G Digital Coherent Optics Parameters,
on page 432 section.

Note
The Tx power parameter is the best effort configuration
which programs user configuration to hardware. However,
the ZR/ZRP transceiver firmware will only use it as
reference and calculates the actual optimal Tx power value
at run time, which may or may not be the same as a user
configuration.

Configures frequency based on the configured frequency
(100MHz-grid or 100GHz-grid or 50GHz-grid). The
50GHz-grid provide additional ITU-channel, or wavelength
parameters. For more information, see 400G Digital
Coherent Optics Parameters, on page 432 section.

Note
If the frequency is configured using 50Ghz-grid
wavelength or 50Ghz-grid itu-channel option, the system
calculates the frequency for a given wavelength or
ITU-channel and use it to program the hardware.

Configures operating the frequency of a ZR optics module
in GHz to align with DWDM grid requirements.

switch(config-if)# zr-optics frequency 193500.0

Use the no form to disable frequency configuration.

Configuring 400G Digital Coherent Optics on ZRP Module

You can configure the coherent optics on the ZRP module for DAC rate, muxponder mode, modulation, and
FEC parameters.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

440

Configuring 400G Digital Coherent Optics

Configuring 400G Digital Coherent Optics on ZRP Module

Before you begin

Ensure that the following points are taken care during DCO configuration:

• Without insertion of ZRP optics, the coherent optics configuration will not work.

• When we configure specific zr-optics on the ZRP module, the coherent configuration will not work.

• When we configure specific zrp-optics on the ZR module, the coherent configuration will not work.

SUMMARY STEPS

1. configure terminal
2.
3.
4.
5.
6.

interface ethernet {type slot/port}
[no] zrp-optics fec fec_val muxponder mxp_val modulation mod_val dac-rate dr_val
(Optional) zrp-optics cd-min cd_min cd-max cd_max
(Optional) zrp-optics transmit-power tx_pwr
(Optional) zrp-optics dwdm-carrier [ 100MHz-grid frequency freq_100mhz_val | 100GHz-grid
frequency freq_100ghz_val | 50GHz-grid { frequency freq | itu-channel itu-chan | wavelength wavelen}]

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

interface ethernet {type slot/port}

Example:

switch(config)# interface ethernet 1/3
switch(config-if)#

Step 3

[no] zrp-optics fec fec_val muxponder mxp_val
modulation mod_val dac-rate dr_val

Example:

switch(config-if)# zrp-optics fec cFEC muxponder
1x400 modulation 16QAM dac-rate 1x1

Specifies an interface to configure, and enters interface
configuration mode.

Configures the following parameters on ZRP optics. For
more information, see 400G Digital Coherent Optics
Parameters, on page 432 section:

• FEC

• Muxponder

• Modulation

• DAC

Step 4

(Optional) zrp-optics cd-min cd_min cd-max cd_max

Example:

switch(config-if)# zrp-optics cd-min -2400 cd-max

2400

Configures chromatic dispersion on coherent optics with
set minimum and maximum values. For more information,
see 400G Digital Coherent Optics Parameters, on page 432
section.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

441

Configuring Breakout

Configuring 400G Digital Coherent Optics

Command or Action

Purpose

Step 5

(Optional) zrp-optics transmit-power tx_pwr

Example:

switch(config-if)# zrp-optics transmit-power -190

Example:

switch(config-if)# zrp-optics transmit-power -13.5

Step 6

(Optional) zrp-optics dwdm-carrier [ 100MHz-grid
frequency freq_100mhz_val | 100GHz-grid frequency
freq_100ghz_val | 50GHz-grid { frequency freq |
itu-channel itu-chan | wavelength wavelen}]

Example:

switch(config-if)# zrp-optics dwdm-carrier
100MHz-grid frequency 1913000

Note
When you configure the maximum and minimum values
for chromatic dispersion for any data rate, ensure that the
mimimum difference between the configured values is
equal to or greater than 1000 ps/nm.

Sets the transmit power of the optical signal. For more
information, see 400G Digital Coherent Optics Parameters,
on page 432 section.

Note
The Tx power parameter is best effort configuration which
programs user configuration to hardware. However, the
ZR/ZRP transceiver firmware will only use it as reference
and calculates the actual optimal Tx power value at run
time, which may or may not be same as an user
configuration.

Note
The zrp-optics transmit-power command now accepts
values in both decimal and whole number formats.

Configures frequency based on the configured frequency
(100MHz-grid or 100GHz-grid or 50GHz-grid). The
50GHz-grid provide additional ITU-channel, or wavelength
parameters. For more information, see 400G Digital
Coherent Optics Parameters, on page 432 section.

Note
If the frequency is configured using 50Ghz-grid
wavelength or 50Ghz-grid itu-channel option, the system
calculates the frequency for a given wavelength or
ITU-channel and use it to program the hardware.

Configuring Breakout

You can configure breakout on the interface for ZRP optics.

SUMMARY STEPS

1. configure terminal
2.
3.
4.
5.

interface breakout module {slot} port {port_num} map {breakoutmap}
interface ethernet {type slot/port/sub-port}
[no] zrp-optics fec fec_val muxponder mxp_val modulation mod_val dac-rate dr_val
(Optional) show running interface ethernet {type slot/port}

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

442

Configuring 400G Digital Coherent Optics

Configure Transceiver Auto Squelch

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

interface breakout module {slot} port {port_num} map
{breakoutmap}

Configures interface breakout

Example:

switch(config)# interface breakout module 1
port 3 map 100g-2x-pam4

Step 3

interface ethernet {type slot/port/sub-port}

Example:

switch(config)# interface ethernet 1/3/1
switch(config-if)#

Step 4

[no] zrp-optics fec fec_val muxponder mxp_val
modulation mod_val dac-rate dr_val

Example:

switch(config-if)# zrp-optics fec oFEC muxponder
2x100 modulation QPSK dac-rate 1x1

Specifies an interface to configure, and enters interface
configuration mode.

Configures the ZRP configuration on the breakout interface.

Step 5

(Optional) show running interface ethernet {type
slot/port}

Displays the configuration information set on the breakout
interface.

Example:

switch(config-if)# show running interface
ethernet1/3/1

Configure Transceiver Auto Squelch

You can use the squelch functionality of optical transceivers to automatically manage signal integrity, preventing
undesirable noise and ensuring clean signal transmission.

Use this feature in high-speed optical network environments where signal integrity is critical.

SUMMARY STEPS

1. configure terminal
2.
3.

interface ethernet {type slot/port/sub-port}
[no] transceiver auto-squelch

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

443

Configuring 400G Digital Coherent Optics

Configure Transceiver Loopback

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface ethernet {type slot/port/sub-port}

Example:

switch(config)# interface ethernet 1/3/1
switch(config-if)#

Specify an interface to configure, and enter interface
configuration mode.

Step 3

[no] transceiver auto-squelch

Example:

Enable squelching in the signal to prevent undesirable noise.
This command is enabled by default.

switch(config-if)# transceiver auto-squelch

Use the no form to disable auto squelching.

Configure Transceiver Loopback

You can use loopback testing to diagnose and troubleshoot network connectivity and transceiver functionality
by rerouting signals back to origin.

SUMMARY STEPS

DETAILED STEPS

1. configure terminal
2.
3.

interface ethernet {type slot/port/sub-port}
[no] transceiver loopback{internal | line

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface ethernet {type slot/port/sub-port}

Example:

switch(config)# interface ethernet 1/3/1
switch(config-if)#

Specify an interface to configure, and enter the interface
configuration mode.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

444

Configuring 400G Digital Coherent Optics

Configure Transceiver Performance Monitoring

Command or Action

Purpose

Step 3

[no] transceiver loopback{internal | line

Example:

Enable transceiver loopback. This command is disabled by
default.

switch(config-if)# transceiver loopback internal
switch(config-if)# transceiver loopback line
switch(config-if)# no transceiver loopback

• Internal: Configure internal loopback to verify the
transceiver's internal functionality without external
signals.

• Line: Configure a line loopback to route the

transmitted signal back to the receiver. This mode tests
the entire transmission path and checks for errors in
the signal or connection.

Use the no form to disable transceiver loopback.

Note
Ensure that your network environment is configured to
support loopback testing without interrupting services

Configure Transceiver Performance Monitoring

You can gather and analyze critical metrics to ensure optimal performance and quick detection of potential
issues.

SUMMARY STEPS

1. configure terminal
2.
3.
4.
5.

interface ethernet {type slot/port/sub-port}
[no] transceiver performance-monitoring
(Optional) show interface ethernet {type slot/port}performance-monitoring
(Optional) show interface ethernet {type slot/port} transceiver performance-monitoring history
bucket_interval {fec | optics} interval interval_value

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

configure terminal

Enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

interface ethernet {type slot/port/sub-port}

Example:

switch(config)# interface ethernet 1/25
switch(config-if)#

Specify an interface to configure, and enter interface
configuration mode.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

445

Configure Transceiver Performance Monitoring

Configuring 400G Digital Coherent Optics

Command or Action

Purpose

Step 3

[no] transceiver performance-monitoring

Example:

switch(config-if)# transceiver
performance-monitoring

Step 4

(Optional) show interface ethernet {type
slot/port}performance-monitoring

Example:

switch(config-if)# show interface ethernet 1/25
transceiver performance-monitoring current 30-sec
Interface Ethernet1/25

Configure performance monitoring to monitor and optimize
performance.

• Real-Time Monitoring: allows you to observe

transceiver metrics such as optical power levels,
dispersion, and bit error rates.

• Fault Detection: allows you to identify and address
transceiver issues proactively to prevent network
disruptions.

• Performance Optimization: allows you to monitor

transceivers to operate within specified parameters to
maintain network efficiency.

Use the no form to disable transceiver performance
monitoring.

View the transceiver performance monitoring information.

Step 5

(Optional) show interface ethernet {type slot/port}
transceiver performance-monitoring history
bucket_interval {fec | optics} interval interval_value

Displays the historical performance monitoring data for the
specified interface, bucket interval, data layer, and interval
value.

Example:

switch# show interface ethernet 1/25 transceiver
performance-monitoring history 15-min fec interval

5

• eth_interface specifies the Ethernet interface to be

queried.

• bucket_interval indicates the time interval for the

data bucket (30-sec, 15-min, or 24-hour).

• fec or optics selects between FEC and optics data

layers.

• interval_value specifies the particular historical

interval to display.

Note
This CLI is supported beginning with Cisco NX-OS
Release 10.6(1)F.

Example

Verify Transceiver Performance Monitoring information

switch(config-if)# show interface ethernet 1/25 transceiver performance-monitoring current

30-sec

Interface Ethernet1/25
--------------------------

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

446

Configuring 400G Digital Coherent Optics

Configure Transceiver Performance Monitoring

Optics in the current interval [21:32:49 Wed Nov 20 2024 - 21:33:00 Wed Nov 20 2024]

AVG

MAX

MIN

Parameter
-----------------------------------------------
CD(Short)[ps/nm] 0.00
0.47
DGD[ps]
-9.56
RX PWR[dBm]
-10.00
TX PWR[dBm]
OSNR[dB]
28.10
RX CHAN PWR[dBm] -9.25
16.60
ESNR[dB]
201.00
LASER BIAS[mA]
FREQ OFF[Mhz]
-314.00
SOP RATE[krad/s] 4.00
0.50
PDL[dB]
1.60
SOPMD[ps^2]

0.00
0.55
-9.55
-9.99
28.10
-9.24
16.60
201.00
-303.00
4.00
0.50
1.79

0.00
0.63
-9.54
-9.99
28.10
-9.22
16.60
201.00
-294.00
4.00
0.50
2.17

FEC in the current interval [21:32:49 Wed Nov 20 2024 - 21:33:00 Wed Nov 20 2024]

EC BITS : 0
UC WORDS : 0

AVG

MIN

Parameter
--------------------------------------------
PREFEC BER
POSTFEC BER
Q FACTOR[dB]
Q MARGIN[dB]

9.32e-04 9.38e-04 9.43e-04
0.00e+00 0.00e+00 0.00e+00
9.80
2.80

9.89
2.80

9.86
2.80

MAX

Clear Transceiver Performance Monitoring information

To clear 30-sec interval counters on an interface

clear counters interface ethernet <> transceiver performance-monitoring current 30-sec

To clear 15-min interval counters on an interface

clear counters interface ethernet <> transceiver performance-monitoring current 15-min

To clear 24-hour interval counters on an interface

clear counters interface ethernet <> transceiver performance-monitoring current 24-hour

To clear 30-sec interval counters on all interfaces

clear counters interface transceiver performance-monitoring current 30-sec

To clear 15-min interval counters on all interfaces

clear counters interface transceiver performance-monitoring current 15-min

To clear 24-hour interval counters on all interfaces

clear counters interface transceiver performance-monitoring current 24-hour

Clear Historical Transceiver Performance Monitoring Data

To clear all historical performance monitoring data (30-sec, 15-min, and 24-hour buckets) for a
specific interface:

clear counters interface ethernet <> transceiver performance-monitoring history

To clear all historical performance monitoring data on all interfaces:

clear counters interface transceiver performance-monitoring history

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

447

Configure Transceiver Alarms

Configuring 400G Digital Coherent Optics

Optionally, you can specify a particular interval if you wish to clear only one type of bucket (30-sec,
15-min, or 24-hour):

clear counters interface ethernet <> transceiver performance-monitoring history 30-sec

Configure Transceiver Alarms

Set threshold values for key performance parameters to trigger alarms when the threshold values exceed the
predefined threshold values.

Procedure

Step 1

Use the configure terminal command to enter global configuration mode.

Example:

switch# configure terminal
switch(config)#

Step 2

Specify the interface to enter interface configuration mode with the interface ethernet {type slot/port/sub-port} command.

Example:

switch(config)# interface ethernet 1/21/1
switch(config-if)#

Step 3

Set threshold values for transceiver alarms with the [no] transceiver alarms cd| dgd| lbc| osnr| prefec-ber|
laser-temperature| temperature| voltage| rx-power { high-threshold | low-thresholdthreshold-value }

Example:

switch(config)# interface ethernet 1/21
switch(config-if)# transceiver alarms cd high-threshld 300000
switch(config-if)# transceiver alarms dgd high-threshold 100
switch(config-if)# transceiver alarms esnr high-threshold 25
switch(config-if)# transceiver alarms laser-temperature low-threshold 51.67
switch(config-if)# transceiver alarms laser-temperature high-threshold 40.21
switch(config-if)# transceiver alarms temperature low-threshold 79.00
switch(config-if)# transceiver alarms temperature high-threshold 1.00
switch(config-if)# transceiver alarms voltage low-threshold 6.90
switch(config-if)# transceiver alarms voltage high-threshold 2.67
switch(config-if)# transceiver alarms rx-power low-threshold 46.00
switch(config-if)# transceiver alarms rx-power high-threshold -41.23

Set the threshold values to monitor critical metrics to trigger alarms.

• cd: Set high and low threshold values for chromatic dispersion.

• dgd: Set high threshold values for differential group delay.

• ensr: Set high and low threshold values for the electrical signal-to-noise ratio.

• lbc: Set high and low threshold values for parameters for laser bias current.

• onsr: Set low threshold values for the optical signal-to-noise ratio.

• prefec-ber: Set high and low threshold values for forward error correction bit error rate.

• laser-temperature: Set high and low threshold values laser temperature.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

448

Configuring 400G Digital Coherent Optics

Configure Transceiver Alarms

• voltage:Set high and low threshold values voltage.

• rx-power: Set high and low threshold values for forward rx-power.

Use the no form to disable transceiver alarms.

Note
Determine the threshold values in the network design and performance requirements. Review and adjust threshold values
regularly to align with network conditions and objectives.

Step 4

(Optional) View the transceiver alarms with the show running-config interface ethernet command.

Example:

switch(config)# show running-config interface ethernet 1/21
!Command: show running-config interface Ethernet1/21
!No configuration change since last restart
!Time: Mon Mar 24 21:57:21 2025
.
.!
interface Ethernet1/1

transceiver alarms laser-temperature low-threshold 51.67
transceiver alarms laser-temperature high-threshold 40.21
transceiver alarms temperature low-threshold 79.00
transceiver alarms temperature high-threshold 1.00
transceiver alarms voltage low-threshold 6.90
transceiver alarms voltage high-threshold 2.67
transceiver alarms rx-power low-threshold 46.00
transceiver alarms rx-power high-threshold -41.23
no shutdown

View transceiver alarms

switch# show interface ethernet 1/21 transceiver alarms

Interface Ethernet1/21

Occurrences
-----------

Current System Time: 08:54:38 Wed Apr 23 2025
Current State
-------------
DEFAULT TRANSCEIVER ALARMS:
---------------------------
.
.
.
CONFIGURATION ALARMS:
---------------------

Last Trigger
------------

FEC Alarms:

Pre Fec BER low alarm

never

Pre Fec BER high alarm

never

Optics Alarms:
CD low alarm

never

CD high alarm

never

DGD high alarm

never

LBC low alarm

never

ok

ok

ok

ok

ok

ok

0

0

0

0

0

0

Last Reset
----------

never

never

never

never

never

never

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

449

Verifying 400G Digital Coherent Optics

Configuring 400G Digital Coherent Optics

LBC high alarm

never

OSNR low alarm

never

ESNR low alarm

never

ESNR high alarm

never

Temperature low alarm

never

ok

ok

ok

ok

ok

Temperature high alarm

activated

never

Voltage low alarm

activated

never

Voltage high alarm
never
Rx Power low alarm

never

Rx Power high alarm

never

ok

ok

ok

Laser temperature low alarm ok

never

Laser temperature high alarm ok

never

Clear transceiver alarms information

0

0

0

0

0

1

1

0

0

0

0

0

never

never

never

never

never

01:09:27 Apr 21 2025

19:07:39 Apr 21 2025

never

never

never

never

never

Use the clear counters interface ethernet transceiver alarms command to clear alarms on an interface.

clear counters interface ethernet 1/21 transceiver alarms

Use the clear counters interface transceiver alarms comand to clear alarms on all interfaces.

clear counters interface transceiver alarms

Verifying 400G Digital Coherent Optics

To verify the 400G Digital Coherent Optics configuration information, perform one of the following tasks:

Command

Purpose

show running interface ethernet {type slot/port}

Displays the running configuration information of the
interfaces configured to validate the coherent ZR/ZRP
optics.

show interface ethernet {type slot/port} transceiver
details

Displays the coherent ZR/ZRP optics configuration
information of the interfaces.

Configuration Examples for 400G Coherent Optics

The following example show the running configuration with ZR/ZRP optics:

switch(config-if)# show running interface ethernet1/3

!Command: show running-config interface Ethernet1/3
!Running configuration last done at: Mon Aug 28 12:16:40 2023
!Time: Mon Aug 17 12:17:40 2023

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

450

Configuring 400G Digital Coherent Optics

Configuration Examples for 400G Coherent Optics

version 10.3(2) Bios:version 01.10

interface Ethernet1/3

zr-optics fec cFEC muxponder 1x400 modulation 16QAM dac-rate 1x1
zr-optics cd-min -2400 cd-max 2400
zr-optics transmit-power -190
zr-optics dwdm-carrier 100MHz-grid frequency 1931000
no shutdown

The following example shows how to verify the coherent configuration:

From 10.5(3)F:

switch# show interface ethernet1/3 transceiver details
Ethernet1/3

transceiver is present
type is QSFP-DD-400G-ZR-S
name is CISCO-ACACIA
part number is DP04QSDD-E20-190
revision is A
serial number is ACA254700F0
nominal bitrate is 425000 MBit/sec per channel
cisco id is 0x18
cisco extended id number is 21
cisco part number is 10-3495-01
cisco product id is QDD-400G-ZR-S
cisco version id is V01
firmware version is 61.10
Link length SMF is 12 km
Nominal transmitter wavelength is 1547.70 nm
Wavelength tolerance is 166.550 nm
host lane count is 8
media lane count is 1
max module temperature is 80 deg C
min module temperature is 0 deg C
min operational voltage is 3.12 V
vendor OUI is 0x7cb25c
date code is 211125
clei code is INUIANYEAA
power class is 8 (>14 W maximum)
max power is 20.00 W
near-end lanes used none
far-end lane code for 8 lanes Undefined
media interface is unknown value 0x10
Advertising code is Optical Interfaces: SMF
Host electrical interface code is 400GAUI-8 C2M (Annex 120E)

Optics Status:

FEC State: cFEC
DWDM carrier Info: Frequency: 0.0000 THz
Wavelength: inf nm
DAC Rate: 1x1
Configured Tx Power: -7.00 dBm
Modulation Type: 16QAM
Muxponder Type: 1x400
Configured CD-MIN: -2400 ps/nm CD-MAX: 2400 ps/nm
Transceiver Squelch Status: Enable
Laser Admin State: Off
Laser Oper State: Off
Loopback Mode: Disabled

Vendor Details:

Optics Type: QSFP-DD-400G-ZR-S
Firmware Version: Major.Minor.Build

Active : 61.20.13

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

451

Configuration Examples for 400G Coherent Optics

Configuring 400G Digital Coherent Optics

Inactive: 61.20.13

Lane Number:1 Network Lane

----------------------------------------------------------------------------
Alarms

Warnings

High

Low

High

Low

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

0.00 dBm -18.23 dBm
1.99 dBm -23.01 dBm

36.00 C
3.36 V
N/A
N/A
N/A

80.00 C
3.46 V
N/A

-5.00 C
3.13 V
N/A

75.00 C
3.43 V
N/A

15.00 C
3.16 V
N/A

-16.02 dBm
-20.00 dBm

-2.00 dBm
0.00 dBm

Until 10.5(2)F:

switch# show int e1/3 transceiver details
Ethernet1/3

transceiver is present
type is QSFP-DD-400G-ZR-S
name is CISCO-ACACIA
part number is DP04QSDD-E20-190
revision is A
serial number is ACA2524000V
nominal bitrate is 425000 MBit/sec per channel
cisco id is 24
cisco extended id number is 21
cisco part number is 10-3495-01
cisco product id is QDD-400G-ZR-S
cisco version id is V01
firmware version is 61.22
Link length SMF is 12 km
Nominal transmitter wavelength is 1547.70 nm
Wavelength tolerance is 166.550 nm
host lane count is 8
media lane count is 1
max module temperature is 80 deg C
min module temperature is 0 deg C
min operational voltage is 3.12 V
vendor OUI is 0x7cb25c
date code is 210614
clei code is INUIANYEAA
power class is 8 (>14 W maximum)
max power is 20.00 W
near-end lanes used none
far-end lane code for 8 lanes Undefined
media interface is C-band tunable laser
Advertising code is Optical Interfaces: SMF
Host electrical interface code is 400GAUI-8 C2M (Annex 120E)

Optics Status:

FEC State: cFEC
DWDM carrier Info: Frequency: 193.1000 THz
Wavelength: 1552.524 nm

DAC Rate: 1x1
Configured Tx Power: -10.00 dBm
Modulation Type: 16QAM
Muxponder Type: 1x400
Configured CD-MIN: -2400 ps/nm
Transceiver Squelch Status: Enable
Laser Admin State: On
Laser Oper State: On
Loopback Mode: Disabled

CD-MAX: 2400 ps/nm

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

452

Configuring 400G Digital Coherent Optics

Upgrade firmware on ZR optics

Vendor Details:

Optics Type: QSFP-DD-400G-ZR-S
Firmware Version: Major.Minor.Build
Active : 61.22.21
Inactive: 61.10.12

Lane Number:1 Network Lane

-------------------------------------------------------------------------------------

Current
Measurement

Low
-------------------------------------------------------------------------------------
Temperature
Voltage
Current
Tx Power

46.00 C
3.26 V
N/A
-10.00 dBm

-5.00 C
3.13 V
N/A
-18.23 dBm

80.00 C
3.46 V
N/A

75.00 C
3.43 V
N/A

15.00 C
3.16 V
N/A
-16.02

-2.00 dBm

0.00 dBm

High

High

Low

Alarms

Warnings

dBm

Rx Power

dBm

-9.70 dBm

7.99 dBm

-23.01 dBm

7.99 dBm

-21.54

Laser temperature
RX Channel Power

47.13 C
-9.57 dbm

N/A

3.00 dbm

N/A
-23.50 dbm

N/A

0.00 dbm

N/A
-20.00

dbm

8.13e-04
0.00e+00

0.00 ps/nm
0.00 ps/nm
3.00 ps
33.00 ps^2
0.50 dB
36.40 dB
18.00 dB
-391.00 MHz

Pre-FEC BER
Post-FEC BER
CD (Short Link)
CD (Long Link)
Diff. group delay
SOPMD
PDL
OSNR
ESNR
Carrier freq off
SOP Rate of Chg
Laser bias
RX Q factor
RX Q margin
SOPMD LO GR
Tx modulator bias
Transmit Fault Count = 0
----------------------------------------------------------------------------
Note: ++ high-alarm; + high-warning; -- low-alarm; - low-warning

210.00 mA
9.89 dB
2.70 dB
33.00 ps^2
34.93 %

N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A

N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A

N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A

0.00 krad/s

N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A
N/A

The following sample shows how to configure the breakout configuration on the breakout interface:

switch(config)# interface ethernet 1/3/1
switch(config-if)# zrp-optics fec ofec muxponder 2x100 modulation QPSK dac-rate 1x1

switch (config-if)# show running interface ethernet1/3/1

interface Ethernet1/3/1

zrp-optics fec oFEC muxponder 2x100 modulation QPSK dac-rate 1x1
zrp-optics cd-min -50000 cd-max 50000
zrp-optics transmit-power -190
zrp-optics dwdm-carrier 100MHz-grid frequency 1913000
no shutdown

Upgrade firmware on ZR optics

Use this task to upgrade the firmware on the ZR optics of the N9K-C9332D-H2R.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

453

Upgrade firmware on ZR optics

Configuring 400G Digital Coherent Optics

Before you begin

Read the guidelines on firmware upgrade.

• Perform firmware download and activation on one interface at a time to ensure a reliable and focused

upgrade process.

• Pause interface configuration changes during the upgrade process to ensure a smooth experience.

Refrain from performing operations on the peer port that could impact link stability. This helps to prevent
unintended behavior and avoids unnecessary port reprogramming during upgrade.

• Avoid downgrading firmware, as it may impact functionality (e.g., DOM fetching).

If you must downgrade, manually reseat the transceiver or perform a system reload to aid in recovery.

Procedure

Step 1

Install the firmware on the transceiver with the install transceiver interface ethernetinterfacedownload command.

Example:

Switch# install transceiver interface ethernet 1/31 download
bootflash:560-0101-37_Rev_71_110_25_gl2qsdd.ackit
Transceiver firmware download started
Switch#

2025 Apr 20 20:38:53 Switch %USER-SLOT1-2-SYSTEM_MSG: Firmware Download for transceiver on interface

eth1/31 is completed, proceed with activation process.

Check the status of the download on the transceiver using the show install transceiver command.

Switch# show install transceiver interface ethernet 1/1 status

Downloading is in progress [45/100 Completed]

Step 2

Use the install transceiver interface ethernetinterfaceactivate | disruptive command to activate the firmware installation
on the transceiver.

Install the firmware on the switch.

• activate: Activate firmware installation.

• disruptive: Activate disruptive firmware installtion.

Example:

Switch# install transceiver interface ethernet 1/31 activate
Firmware activation is started
Switch#

2025 Apr 20 20:40:10 Switch %USER-SLOT1-2-SYSTEM_MSG: Firmware Activation for transceiver on interface

eth1/31 is completed.

Step 3

Use the show install transceiver interface ethernetinterfaceinfo | status to check the firmware version and status on
the transceiver.

Example:

Switch# show install transceiver interface ethernet 1/31 info
Firmware Version:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

454

Configuring 400G Digital Coherent Optics

Overview of Optical Line System - Pluggable Support for QSFP-DD

Active : 71.110.25
Passive : 71.120.8
Switch#

Switch# show install transceiver interface ethernet 1/31 status
No transceiver firmware upgrade is in process.
Switch#

Overview of Optical Line System - Pluggable Support for
QSFP-DD

The QDD Optical Line System (OLS) is a pluggable optical amplifier enabling connection between two routers
or switches

• for transmitting traffic on a limited number of coherent optical channels, and

• as a single span point-to-point link.

OLS helps transport 8 or 16 optical channels without any additional optical hardware unit.

The OLS topology is displayed as follows:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

455

Benefits

Configuring 400G Digital Coherent Optics

Figure39:OLStopology

Benefits

A QSFP-DD module plugged into a port of the router or switch has the ability to provide amplification. The
benefits of having the OLS are:

• provides compact solution for amplification,

• provides extended reach,

• increases fiber bandwidth, and

• lowers power dissipation.

Cisco provided solution of the pluggable form of the QSFP-DD OLS for ZR and ZR Plus variant of Coherent
optics helps in

• reduction of more equipments, rack space and power,

• avoid usage of external amplifiers and multiplexers,

• extend the reach of a 400G QSFP-DD ZR or ZR plus link from 40 to 130 km or longer depending on

fiber specification, the channel count, and the line rate of the signal, and

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

456

Configuring 400G Digital Coherent Optics

Supported Platforms

• extend the reach of a 400G Bright QSFP-DD ZR or ZR+ link from 80 to 130 km or longer depending

on fiber specification, the channel count, and the line rate of the signal

Supported Platforms

• Cisco Nexus 9300 Series Switch

• N9K-C9364D-GX2A

• N9K-C9332D-GX2B

• N9K-C9348D-GX2A

• Cisco Nexus 9400 Series Switch (N9K-C9408 with N9K-X9400-8D LEM)

Guidelines and Limitations

OLS operational mode guidelines

The following are the guidelines for the configuration of OLS operational mode:

• Use the command no shutdown on an interface to activate and apply the OLS configuration.

• In automatic power control mode, amplifier output power is kept constant, irrespective of incoming signal

strength.

• In manual control mode, gain value is based on loss between RX on peer OLS and TX of transmitting

OLS. Use link loss for configuring the correct gain on COM and LINE side to achieve high signal-to-noise
ratio for critical applications.

The gain value is based on loss between RX on peer OLS and TX of transmitting OLS. The link loss
between two OLS (ols A and ols B) is A -> B = tx_power on ols A - rx_power on ols B. The loss is
compensated by gain on ols B

For example, if the link loss is 10db and ols-A tx power is 0db, then rx_power on ols B = 0-10 = -10dbm.
The 10dbm gain is applied on ols B to compensate on com(receive) side.

Optical Safety Remote Interlock (OSRI) guidelines

When OSRI is enabled, the maximum output power can be -15dBm based on the input power.

OLS safety control mode

• Safety control mode is enabled only on Line side.

• When safety-control-mode is enabled and if LOS is detected on the line RX. The line TX normalizes the
signal output power to 8 dBm putting the line amplifier in Automatic Power Reduction (APR). This
prevents the launch of high level optical power on an open Line.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

457

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

• APR (Automatic Power Reduction) is a temporary condition that keeps the amplifier in a safe, fixed an
well known power level (8dbm), if safety control is enabled and rx-los is detected. You can force APR
permanently (independently by the link connectivity) to troubleshoot.

• When the link connectivity is verified then the amplifier is moved to the final working state (either gain

controlled or power controlled).

Recommendations for wavelength and frequency

Note

Ensure that there is a unique frequency while using coherent optics with OLS.

Channel Spacing

Total Bandwidth

Wavelength in nm

Frequency in THz

End

1558.4

Start

End

192.375

192.775

Start

8 Channels –
200 GHz spaced

19.2 nm

1539.1

16 Channels –
100 GHz spaced

2.4 THz

Recommendations for 8 Channel System

ITU XR Channel

Frequency (in THz)

Wavelength (in nm)

37

41

45

49

53

57

61

65

194.3

194.1

193.9

193.7

193.5

193.3

193.1

192.9

1542.94

1544.53

1546.12

1547.72

1549.32

1550.92

1552.52

1554.13

Recommendations for 16 Channel System

ITU XR Channel

Frequency (in THz)

Wavelength (in nm)

37

39

41

194.3

194.2

194.1

1542.94

1543.73

1544.53

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

458

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

ITU XR Channel

Frequency (in THz)

Wavelength (in nm)

43

45

47

49

51

53

55

57

59

61

63

65

67

194.0

193.9

193.8

193.7

193.6

193.5

193.4

193.3

193.2

193.1

193.0

192.9

192.8

1545.32

1546.12

1546.92

1547.72

1548.51

1549.32

1550.12

1550.92

1551.72

1552.52

1553.33

1554.13

1554.94

Link Loss for QDD-ZR

Line Rate

Traffic mode setting

TX power setting

Guranteed Link Loss
Range (dB)

400G

Link Loss

0

1

400ZR-CFEC-16QAm-0-S

Default

0-19

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

22

23

3

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

459

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

24

24

24

NA

NA

NA

NA

NA

NA

NA

NA

NA

NA

NA

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

NA

NA

NA

NA

NA

NA

NA

NA

NA

NA

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

460

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

Link Loss

QDD-OLS setting

33

NA

NA

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

Link Loss for QDD-ZRP

Line Rate

Traffic mode setting

TX power setting

400G

300G

200G

400ZR-oFEC-16QAM-1-E

Default

300ZR-oFEC-8QAM-1-E

Default

200ZR-oFEC-16QPSK-0-S

Default

Guranteed Link Loss
Range (dB)

0 to 23

0 to 26

0 to 29

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

461

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss for QDD-ZRP 400G

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

0

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

22

23

24

24

24

NA

NA

NA

NA

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

24

24

NA

NA

NA

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

462

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

30

31

32

33

NA

NA

NA

NA

NA

NA

NA

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

463

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss for QDD-ZRP 300G

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

0

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

22

23

24

24

24

NA

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

24

24

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

464

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

30

31

32

33

NA

NA

NA

NA

NA

NA

NA

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

465

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss for QDD-ZRP 200G

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

21

22

23

24

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

0

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

466

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

30

31

32

33

24

NA

NA

NA

24

NA

NA

NA

Link Loss for Bright-ZRP

Line Rate

Traffic mode setting

TX power setting

400G

300G

200G

400ZR-oFEC-16QAM-1-E

Default

300ZR-oFEC-8QAM-1-E

Default

200ZR-oFEC-8QAM-1-S

Default

Guranteed Link Loss
Range (dB)

0 to 28

0 to 29

0 to 29

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

467

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss for Bright-ZRP 400G

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

0

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

13

14

15

16

17

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

24

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

468

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

30

31

32

33

17

NA

NA

NA

24

NA

NA

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

469

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss for Bright -ZRP 300G

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

13

14

15

16

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

0

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

470

Configuring 400G Digital Coherent Optics

Guidelines and Limitations

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

30

31

32

33

17

17

NA

NA

24

24

NA

NA

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

471

Guidelines and Limitations

Configuring 400G Digital Coherent Optics

Link Loss for Bright -ZRP 200G

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

13

14

15

16

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

0

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

472

Configuring 400G Digital Coherent Optics

Configuring amplifier control mode

Link Loss

QDD-OLS setting

EDFA-TX Gain (dB)

EDFA-RX Gain (dB)

30

31

32

33

17

17

NA

NA

24

24

NA

NA

Configuring amplifier control mode

OLS has two amplifiers.

• COM amplifier

boosts incoming signal from the fiber network to connected Coherent optics for transmission.

• LINE amplifier

boosts the signal from Coherent optics to send over the fiber.

SUMMARY STEPS

1. Enter global configuration mode.
2. Enables or disables the amplifier control mode for the line and com.

• manual for egress control.

• powermode for egress control

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

Enter global configuration mode.

configure terminal

Example:

switch# configure terminal

Step 2

Enables or disables the amplifier control mode for the line
and com.

• manual for egress control.

• powermode for egress control

Example:

switch(config)# ols com egress control manual

[no] ols { com | line } egress control <mode>

Default mode is manual. The parameter settings are defined
in the table.

Side

com

line

Default

Minimum

Maximum

manual

manual

power

power

manual

manual

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

473

Configuring the gain control mode

Configuring 400G Digital Coherent Optics

Configuring the gain control mode

SUMMARY STEPS

DETAILED STEPS

1. Enter global configuration mode.
2. Configure the desired gain value of the OLS pluggable for the line and com.

Procedure

Command or Action

Purpose

Step 1

Enter global configuration mode.

configure terminal

Example:

switch# configure terminal

Step 2

Configure the desired gain value of the OLS pluggable for
the line and com.

[no] { ols com egress <com_gain> | line egress gain
<line_gain> }

Example:

switch(config)# ols com egress gain 200

The gain are in units of 0.1 dBm. The parameter settings
are defined in the table.

Side

com

line

Default

Minimum

Maximum

200

210

30

70

250

250

Configuring the power control mode

SUMMARY STEPS

DETAILED STEPS

1. Enter global configuration mode.
2. Configure the desired output power (TX) of the OLS pluggable for the line and com.

Procedure

Command or Action

Purpose

Step 1

Enter global configuration mode.

configure terminal

Example:

switch# configure terminal

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

474

Configuring 400G Digital Coherent Optics

Configuring the power reduction mode

Command or Action

Purpose

Step 2

Configure the desired output power (TX) of the OLS
pluggable for the line and com.

[no] ols { com egress power <com_power> | line egress
power <line_power> }

Example:

switch(config)# ols com egress power 20

The power are in units of dBm. The parameter settings are
defined in the table.

Side

com

line

Default

Minimum

Maximum

80

80

10

0

170

170

Configuring the power reduction mode

SUMMARY STEPS

DETAILED STEPS

1. Enter global configuration mode.
2. Enable or disable the power reduction mode.

Procedure

Command or Action

Purpose

Step 1

Enter global configuration mode.

configure terminal

Example:

switch# configure terminal

Step 2

Enable or disable the power reduction mode.

[no] ols { com | line } egress force power-reduction

Example:

switch(config)# ols com egress force
power-reduction

Side

com

line

Default

Minimum

Maximum

off

off

on

on

off

off

Configuring the Optical Safety Remote Interlock (OSRI) mode

To shut down the amplifier, use the Optical Safety Remote Interlock (OSRI) configuration. Use the
configuration for maintaince of the pluggable and when the OLS pluggable is not in operation.

SUMMARY STEPS

1. Enter global configuration mode.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

475

Configuring the safety control mode

Configuring 400G Digital Coherent Optics

2. Enable or disable thepower reduction mode.

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

Enter global configuration mode.

configure terminal

Example:

switch# configure terminal

Step 2

Enable or disable thepower reduction mode.

[no] ols { com | line } egress force power-reduction

Example:

switch(config)# ols com egress force
power-reduction

The default mode is off. The parameter settings are defined
in the table.

Side

com

line

Default

Minimum

Maximum

off

off

on

on

off

off

Configuring the safety control mode

SUMMARY STEPS

1. Enter global configuration mode.
2. Enable or disable the safety control mode.

• auto or

• disabled

DETAILED STEPS

Procedure

Command or Action

Purpose

Step 1

Enter global configuration mode.

configure terminal

Example:

switch# configure terminal

Step 2

Enable or disable the safety control mode.

[no] ols line egress safety-control

• auto or

• disabled

The default mode is auto.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

476

Configuring 400G Digital Coherent Optics

Verify OLS configuration

Command or Action

Example:

Purpose

switch(config)# ols ols line egress safety-control

Verify OLS configuration

Display the detailed OLS information

Use the show interface ethernet transceiver details command to verify the detailed OLS information.

switch# show interface ethernet 1/2 transceiver details
Ethernet1/2

transceiver is present
type is ONS-QDD-OLS
name is CISCO-ACCELINK
part number is EDFA-211917-QDD
revision is 27
serial number is ACW2723Z007
nominal bitrate is 425000 MBit/sec per channel
cisco id is 24
cisco extended id number is 237
cisco part number is 1010045801
cisco product id is ONS-QDD-OLS
cisco version id is V01
firmware version is 2.7
host lane count is 0
media lane count is 0
max module temperature is 0 deg C
min module temperature is 0 deg C
min operational voltage is 0.00 V
vendor OUI is 0x000000
date code is 23070401
clei code is WMOGAT2MAA
power class is 2 (3.5 W maximum)
max power is 3.50 W
near-end lanes used none
far-end lane code for 8 lanes Undefined
media interface is others
Advertising code is Optical Interfaces: SMF
Host electrical interface code is Undefined
media interface advertising code is Undefined
Operational Parameters:
---------------------

COM Side:

Total Tx Power = -327.68 dBm
Rx Signal Power = -327.68 dBm
Tx Signal Power = -327.68 dBm
Egress Ampli Gain = 0.0 dBm
Egress Ampli OSRI = ON
Egress Force APR = ON

Line Side:

Total Tx Power = -327.68 dBm
Rx Signal Power = -327.68 dBm
Tx Signal Power = -327.68 dBm
Egress Ampli Gain = 0.0 dBm
Egress Ampli Safety Control mode = disabled
Egress Ampli OSRI = ON
Egress Force APR = ON

Configured Parameters:

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

477

Verify OLS configuration

Configuring 400G Digital Coherent Optics

----------------------

COM Side:

Egress Ampli Gain = 20.0 dBm
Egress Ampli Power = 17.0 dBm
Egress Ampli OSRI = ON
Ampli Control mode = Power
Rx Low Threshold = -300.0 dBm
Tx Low Threshold = -50.0 dBm
Egress Force APR = ON

Line Side:

Egress Ampli Gain = 20.0 dBm
Egress Ampli Power = 17.0 dBm
Egress Ampli Safety Control mode = disabled
Egress Ampli OSRI = ON
Ampli Control mode = Power
Rx Low Threshold = -300.0 dBm
Tx Low Threshold = -50.0 dBm
Egress Force APR = ON

Temperature = 19.70 Celsius
Voltage = 3.34 V

Display the brief OLS information

Use the show interface ethernet brief command to verify the OLS information in brief.

switch# show interface e1/2 brief

--------------------------------------------------------------------------------
Ethernet
Interface
--------------------------------------------------------------------------------
Eth1/2

eth routed down

Status Reason

olsInserted

auto(D) --

Type Mode

Speed

VLAN

Port
Ch #

--

Display the status of the optic

Use the show interface status command to verify the status of the optic.

switch# show interface e1/2 status

--------------------------------------------------------------------------------
Port
--------------------------------------------------------------------------------
ONS-QDD-OLS
Eth1/2

olsInsert routed

Duplex Speed

Status

Type

auto

auto

Vlan

Name

--

Display the running configuration

Use the show running-config interface ethernet command to display the running configuraton of the OLS.

switch# show running-config interface ethernet1/2
!Command: show running-config interface Ethernet1/2
!Running configuration last done at: Mon Feb 26 12:39:24 2024
!Time: Mon Feb 26 13:03:34 2024
version 10.4(3) Bios:version 01.07
interface Ethernet1/2

ols com egress control power
ols com egress osri
ols com egress power 170
ols line egress control power
ols line egress osri
ols line egress gain 200
ols line egress power 170
no ols line egress safety-control
ols com egress force power-reduction

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

478

Configuring 400G Digital Coherent Optics

Verify OLS configuration

ols line egress force power-reduction
no shutdown

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

479

Verify OLS configuration

Configuring 400G Digital Coherent Optics

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

480

