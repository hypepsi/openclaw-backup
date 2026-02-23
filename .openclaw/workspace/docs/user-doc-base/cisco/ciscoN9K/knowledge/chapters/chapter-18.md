# Chapter 18


Versatile diagnostics monitoring for optics

• Versatile diagnostics monitoring for optics, on page 481

Versatile diagnostics monitoring for optics

Starting with Cisco NX-OS Release 10.6(1)F, you can use versatile diagnostics monitoring (VDM) to monitor
pluggable optical modules on the Cisco N9364E-SG2-Q switches.

Cisco NX-OS Release 10.6(1)F introduces support for VDM features on capable optic modules. However,
functionality depends on the module's vendor and its specific firmware version.

• This feature extends standard performance and diagnostics monitoring capabilities beyond traditional

Digital Optical Monitoring (DOM).

• VDM provides access to advanced data parameters, such as signal-to-noise ratio, pre-FEC bit error rates,

and laser aging.

• You can perform more effective proactive maintenance, troubleshoot complex issues, and assess long-term

optical module viability.

Use VDM to gain deeper insight into the health and performance of an optical link. By tracking advanced
parameters, you can identify potential issues before they escalate and improve proactive maintenance

Key Parameters (VDM Observables)

You can monitor a set of observable types with VDM, depending on the module. The table lists key parameters,
their data types, and their units

Table23:Keyparameters(VDMObservables)

Observable Type

Instance Type

Laser Age (Data Path): Percentage from Beginning of
Life (BOL) to End of Life (EOL). A larger number means
it is closer to its EOL.

Basic

TEC Current (Module): The amount of current flowing
to the Thermo-Electric Cooler (TEC) of a cooled laser

Basic

Unit

%

%

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

481

Versatile diagnostics monitoring for optics

Versatile diagnostics monitoring for optics

Observable Type

Instance Type

Laser Frequency Error (Media Lane): The difference
between the target center frequency and the actual current
center frequency

Laser Temperature (Media Lane): The temperature
difference between the target laser temperature and the
actual current temperature for a cooled laser.

eSNR Media Input (Media Lane): Electrical
Signal-to-Noise Ratio on an ingress optical lane.

eSNR Host Input (Lane)

PAM4 Level Transition Parameter Media Input (Media
Lane): Measures electrical level slicer noise

Basic

Basic

Basic

Basic

Basic

PAM4 Level Transition Parameter Host Input (Lane)

Basic

Pre-FEC BER Minimum Media Input (Data Path):
The minimum Pre-Forward Error Correction Bit Error
Ratio observed

Statistic

Pre-FEC BER Minimum Host Input (Data Path)

Statistic

Pre-FEC BER Maximum Media Input (Data Path)

Statistic

Pre-FEC BER Maximum Host Input (Data Path)

Statistic

Pre-FEC BER Average Media Input (Data Path)

Statistic

Pre-FEC BER Average Host Input (Data Path)

Statistic

Pre-FEC BER Current Value Media Input (Data Path)

Basic

Pre-FEC BER Current Value Host Input (Data Path)

Basic

FERC Minimum Media Input (Data Path): Frame Error
Count, the number of uncorrectable FEC frames.

Statistic

FERC Minimum Host Input (Data Path)

FERC Maximum Media Input (Data Path)

FERC Maximum Host Input (Data Path)

FERC Average Media Input (Data Path)

FERC Average Host Input (Data Path)

FERC Current Value Media Input (Data Path)

FERC Current Value Host Input (Data Path)

Statistic

Statistic

Statistic

Statistic

Statistic

Basic

Basic

Unit

MHz

°C

dB

dB

dB

dB

—

—

—

—

—

—

—

—

—

—

—

—

—

—

—

—

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

482

Versatile diagnostics monitoring for optics

Versatile diagnostics monitoring for optics

Note

The exact format and the specific VDM parameters displayed may vary depending on the module type and
system software version

View the VDM information for a transceiver

To view the VDM information for a supported transceiver, use the show interface ethernet interface_id
transceiver vdm command for viewing transceiver diagnostics. The command output includes VDM parameters

switch# show interface ethernet 1/4/1 transceiver vdm
Ethernet1/4/1

transceiver is present
type is OSFP-8x100G-DR
name is FINISAR CORP.
part number is FTCE4517E1PCM
revision is A0
serial number is XCNCGZ2
nominal bitrate is 425000 MBit/sec per channel
cisco id is 25
cisco extended id number is 0
firmware version is 3.5
Link length SMF is 0.5 km
Nominal transmitter wavelength is 1311.00 nm
Wavelength tolerance is 6.500 nm
host lane count is 4
media lane count is 4
max module temperature is 70 deg C
min module temperature is 0 deg C
min operational voltage is 3.14 V
vendor OUI is 0x009065
date code is 241226
power class is 8 (>14 W maximum)
max power is 16.00 W
near-end lanes used none
far-end lane code for 8 lanes Undefined
media interface is 1310 nm EML
Advertising code is Optical Interfaces: SMF
media interface advertising code is 400GBASE-DR4 (Cl 124)

Lane Number:1 Network Lane

Current temperature
Temperature high alarm
Temperature low alarm
Temperature high warning
Temperature low warning
Temperature high alarm threshold
Temperature low alarm threshold
Temperature high warning threshold
Temperature low warning threshold
Current voltage
Voltage high alarm
Voltage low alarm
Voltage high warning
Voltage low warning
Voltage high alarm threshold
Voltage low alarm threshold
Voltage high warning threshold
Voltage low warning threshold
Current current
Current high alarm
Current low alarm
Current high warning

28.75 C

:
: Off
: Off
: Off
: Off
:
:
:
:

3.34 V

75.00 C
-5.00 C
72.00 C
-2.00 C

:

:

3.63 V

2.97 V

3.46 V
3.13 V

:
:
: N/A
: Off
: Off
: Off

:
: Off
: Off
: Off
: Off

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

483

Versatile diagnostics monitoring for optics

Versatile diagnostics monitoring for optics

: Off

6.19 dBm

: -11.24 dBm

7.39 dBm
-3.30 dBm
5.39 dBm
-1.30 dBm
0.66 dBm

: 125.00 mA
:
25.00 mA
: 120.00 mA
:
30.00 mA
: N/A
: Off
: Off

Current low warning
Current high alarm threshold
Current low alarm threshold
Current high warning threshold
Current low warning threshold
Current Tx Power
Tx power high alarm
Tx power low alarm
: Off
Tx power high warning
: Off
Tx power low warning
:
Tx power high alarm threshold
Tx power low alarm threshold
:
Tx power high warning threshold :
:
Tx power low warning threshold
:
Current Rx power
: Off
Rx power high alarm
: Off
Rx power low alarm
: Off
Rx power high warning
: Off
Rx power low warning
Rx power high alarm threshold
:
Rx power low alarm threshold
Rx power high warnings threshold :
Rx power low warnings threshold :
Transmit Fault Count
Laser age
TEC current
Laser frequency error
Laser temperature
eSNR media input
eSNR host input
PAM4 level transition parameter media input:
PAM4 level transition parameter host input: 65535.00
Pre-FEC BER minimum media input
Pre-FEC BER minimum host input
Pre-FEC BER maximum media input
Pre-FEC BER maximum host input
Pre-FEC BER average media input
Pre-FEC BER average host input
Pre-FEC BER current media input
Pre-FEC BER current host input
FERC minimum media input
FERC minimum host input
FERC maximum media input
FERC maximum host input
FERC average media input
FERC average host input
FERC current value media input
FERC current value host input

0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00
0.00

: not valid
10.00
0.00

:
:
: 6110.00

:
: 9637.00

4.19 dBm
-9.20 dBm

:
:
:
:
:
:
:
:
:
:
:
:
:
:
:
:

0.00

0.00

: 0

VDM DME sensors

VDM is available on DME. For more information see, Cisco Nexus NX-API References.

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

484

A P P E N D I X A

ITU C-BAND table

ITU Channel

Frequency (GHz)

Wavelength

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

19610

19605

19600

19595

19590

19585

19580

19575

19570

19565

19560

19555

19550

19545

19540

19535

19530

19525

19520

19515

19510

19505

19500

1528773

1529163

1529553

1529944

1530334

1530725

1531116

1531507

1531898

1532290

1532681

1533073

1533465

1533858

1534250

1534643

1535036

1535429

1535822

1536216

1536609

1537003

1537397

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

485

ITU C-BAND table

ITU C-BAND table

ITU Channel

Frequency (GHz)

Wavelength

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

43

44

45

46

47

48

49

50

51

52

53

54

55

19495

19490

19485

19480

19475

19470

19465

19460

19455

19450

19445

19440

19435

19430

19425

19420

19415

19410

19405

19400

19395

19390

19385

19380

19375

19370

19365

19360

19355

19350

19345

19340

1537792

1538186

1538581

1538976

1539371

1539766

1540162

1540557

1540953

1541349

1541746

1542142

1542539

1542936

1543333

1543730

1544128

1544526

1544924

1545322

1545720

1546119

1546518

1546917

1547316

1547715

1548115

1548515

1548915

1549315

1549715

1550116

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

486

ITU C-BAND table

ITU C-BAND table

ITU Channel

Frequency (GHz)

Wavelength

56

57

58

59

60

61

62

63

64

65

66

67

68

69

70

71

72

73

74

75

76

77

78

79

80

81

82

83

84

85

86

87

19335

19330

19325

19320

19315

19310

19305

19300

19295

19290

19285

19280

19275

19270

19265

19260

19255

19250

19245

19240

19235

19230

19225

19220

19215

19210

19205

19200

19195

19190

19185

19180

1550517

1550918

1551319

1551721

1552122

1552524

1552926

1553329

1553731

1554134

1554537

1554940

1555343

1555747

1556151

1556555

1556959

1557363

1557768

1558173

1558578

1558983

1559389

1559794

1560200

1560606

1561013

1561419

1561826

1562233

1562640

1563047

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

487

ITU C-BAND table

ITU C-BAND table

ITU Channel

Frequency (GHz)

Wavelength

88

89

90

91

92

93

94

95

96

97

19175

19170

19165

19160

19155

19150

19145

19140

19135

19130

1563455

1563863

1564271

1564679

1565087

1565496

1565905

1566314

1566723

1567133

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

488

48

20, 48

20, 50
50

enable
399, 404–405
encapsulation dot1Q 125–126
end 405, 407
errdisable detect cause
errdisable detect cause acl-exception 48
errdisable detect cause all
errdisable detect cause link-flap 48
errdisable detect cause loopback 48
errdisable recovery cause
errdisable recovery cause all
errdisable recovery cause bpduguard 50
errdisable recovery cause failed-port-state
errdisable recovery cause link-flap 50
errdisable recovery cause loopback 50
errdisable recovery cause miscabling 50
errdisable recovery cause psecure-violation 50
errdisable recovery cause security-violation 50
errdisable recovery cause storm-control
errdisable recovery cause udld 50
errdisable recovery cause vpc-peerlink 50
errdisable recovery interval
ethernet

20, 51

50

50

45

I N D E X

E

A

407–408

address
auto-recovery 286, 319
autonomous-system 173

B

bandwidth 61, 223
bfd 173–176, 190
bfd authentication keyed-sha1 keyid 159, 161, 190
bfd echo 163
bfd echo-interface loopback 158
bfd interval
bfd multihop interval
bfd per-link 161
bfd slow-timer
broadcast
124

158–159, 161, 183–185, 190

158, 162

189

C

107

83, 115

channel-group 219, 221–222, 234
checkpoint
clear counters interface
clear counters interface port-channel
clear ip nat translation 414
clear ip route
clear ipv6 route
clear l2protocol tunnel counters
clear lacp counters
config t
128–129
copy 43

258

152

152

372

D

107

285, 288

default interface
delay 62, 223
delay restore
deny 404–405
description 45, 225–226, 340
duplex 227
duplex auto 227
duplex full
227
duplex half
227

258

F

feature bfd 156
feature eigrp 62
feature interface-vlan 109–110, 127
feature lacp 232–233
feature nat
394, 407
feature tunnel
feature vpc

338–339

302

G

graceful consistency-check 311

H

hardware access-list tcam region nat
how l2protocol tunnel summary 372
hsrp bfd 177–178

391

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

IN-1

INDEX

hsrp bfd all-interfaces

177–178

I

include bfd 156
interface

45, 60, 63, 128–129, 137, 159, 315, 394, 399–400, 404–406, 410–
412

interface ethernet

46, 58, 61–62, 69, 82, 98–100, 103, 106, 123, 125, 128–

129, 138, 361, 365, 367

interface loopback 130
interface overload 389
interface port-channel

103, 106, 128–129, 161, 182–185, 217–218, 223–

227, 235–237, 242–246, 248, 250, 307, 309

123, 125, 127, 130, 137, 184, 345–346, 399–400, 404–406

394, 399–400, 405–406, 410–412

395–397, 399, 411–412

394, 399–400, 405–406, 410–412

404–405, 408–410

282

253, 256

404–405

396–399, 410

409, 411–412

340–342, 344–346

389, 407–408, 410–412

interface tunnel
interface vlan 109–110, 127–129
interfaces-vlan 285, 288
ip access-list
ip address
ip arp synchronize
ip eigrp 173, 182
ip load-sharing address
ip nat
389
ip nat inside
ip nat inside source list
ip nat inside source static
ip nat outside
ip nat outside source list
ip nat outside source static
ip nat pool
ip nat translation creation-delay 405, 407
ip nat translation icmp-timeout
405, 407
ip nat translation mas-entries
ip nat translation sampling-timeout
ip nat translation timeout
405–406
ip ospf bfd 174–175, 182–185
ip ospf bfd disable
ip pim bfd 180
ip pim bfd-instance
ip pim pre-build-spt
ip pim spt-threshold infinity 283
ip pim use-shared-tree-only 283
ip route
181
ip route static bfd 181
ipv6 address
ipv6 nd synchronize
isis bfd 176
isis bfd disable

123, 125, 127, 130
282

180
284

405–406

182

182

385, 387

236–237

235

lacp max-bundle
lacp min-links
lacp mode delay 248
lacp port-priority 240
lacp rate
237
lacp rate fast
lacp suspend-individual
lacp system-priority 239
link debounce link-up 69
link debounce time
load- interval
load-interval counters

238

69

115, 143, 257–258
82

245–247

M

128–129
389

mac-address
match-in-vrf
medium 124
medium broadcast
medium p2p
124
mgmt0 45
mtu 58, 60, 340, 342–343

124

N

negotiate auto 34, 79–80
negotiate auto 25000
79
neighbor

171–172, 189–190

P

124

p2p
peer-gateway 281, 312
peer-gateway exclude-vlan 281
peer-keepalive destination 306
peer-switch 314
permit
404–405
permit ip any any 393
port-channel load-balance

202, 228–229

R

171–172, 189–190

role priority 325
router bgp
router eigrp 173
router isis
router ospf

175–176
174

L

365

l2protocol tunnel
l2protocol tunnel cos
l2protocol tunnel drop-threshold 368
l2protocol tunnel shutdown-threshold 368
lacp graceful-convergence

210, 244

366

S

sampling-timeout
show 124
show bfd 187
show bfd neighbors
show cdp all

81

387

187

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

IN-2

45, 63, 81–83, 98, 100–102, 107, 128–129, 219–222

47, 61, 115, 128–129, 142–143

128–129, 142–143, 223–227, 257

46

13

143

177

116, 258

362, 372

340–344

346–347

125–126

115
33

81, 113–115

115
115, 258

156, 257, 302–303, 326, 338–339

show cfs application 286
show dot1q-tunnel
show feature
show hsrp detail
show interface
show interface brief
show interface capabilities
show interface counters
show interface counters detailed 116, 258
show interface counters errors
show interface eth 45, 126
show interface ethernet
show interface ethernet errors
show interface fec
show interface loopback 130, 142, 144
show interface mgmt
show interface port-channel
show interface status err-disabled 49–51, 81
show interface switchport
show interface transceivers
show interface trunk 115
show interface tunnel
show interface vlan 127–129, 143–144
show interfaces
show interfaces tunnel
show ip eigrp 173
show ip load-sharing 253, 256
show ip nat max 414
show ip nat statistics
show ip nat translations
show ip ospf
174–175
show ip route static
show isis
show l2protocol tunnel
show lacp 257
show lacp counters
show lacp system-identifier
show mac address-table
show port-channel capacity 327
show port-channel compatibility-parameters
show port-channel database
show port-channel load-balance
228–229, 257
show port-channel summary 217–218, 234, 257
show port-channel traffic
show port-channel usage
show run nat
show running config 124
show running-config 108–109, 115
show running-config bfd 158, 160–163, 186
show running-config bgp
171–172
show running-config hsrp 177–178
show running-config interface ethernet
115
show running-config interface port-channel
show running-config interface vlan 109–110, 115
show running-config l2pt
372
show running-config pim 180

257
257

257

414

239

414

181

176

372

258

414

285

200, 257

106, 115, 236–237

INDEX

310, 319

81

178

327

280

319, 327

137, 345–346

273, 280, 304, 308–309, 311, 313, 317, 326

322, 324–325, 327
306, 327

272–273, 310, 326
310

show running-config vpc
show running-config vrrp 179
show spanning-tree
show spanning-tree summary 314
show startup-config bfd 187
show startup-config interface vlan 109–110
show udld 66, 81
show udld global
show vlan 103–104
show vpc brief
show vpc consistency-parameters
show vpc consistency-parameters global
show vpc consistency-parameters interface port-channel
show vpc orphan-ports
315
show vpc peer-keepalive
show vpc role
show vpc statistics
show vrf
show vrrp detail
shutdown 20, 63, 224, 242–247, 267
spanning-tree vlan 314
speed 227
speed 10
speed 100
speed 1000
speed auto 34, 227
speed-group 84
speed-group 10000
static
384
switchport
switchport access vlan 98
switchport host
switchport isolated 106
switchport mode
switchport mode dot1q-tunnel
switchport mode trunk 217, 219, 307
switchport trunk 219
switchport trunk allowed vlan 102–103, 219, 307
switchport trunk native
system default interface-vlan autostate
system default switchport
86, 113–114
system default switchport shutdown 114
system jumbomtu 59
system-mac
system-priority 323

33, 86, 124–125, 219, 362, 365, 367

227
227
227

91, 98, 101–102

362, 365, 367

108–109

322

100

219

29

T

terminal dont-ask 103
track 317
tunnel destination 340–341
tunnel mode
tunnel mode gre ip 340–341, 344
tunnel mode ipip 340–342
tunnel path-mtu discovery 344

340–341

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

IN-3

INDEX

tunnel path-mtu discovery age-timer
tunnel path-mtu discovery min-mtu 345
tunnel source
340–341
tunnel ttl
340
tunnel use-vrf

340–341

344–345

U

udld 66
udld aggressive
udld message-time
update-source

65

65
171–172, 190

V

351

309

vlan dot1q tag native
vpc
vpc domain 304–305, 311–313, 317, 319, 322–324
vpc orphan-ports suspend 291, 315
vpc peer-link 308
vrf context
vrf member
vrrp 178–179
vrrp bfd 178–179

181
137, 345–346

Cisco Nexus 9000 Series NX-OS Interfaces Configuration Guide, Release 10.6(x)

IN-4

