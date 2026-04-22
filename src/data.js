// ============================
// MedMap India — Data Module
// ============================

export const HOSPITALS = [
  { id:"H001", name:"All India Institute of Medical Sciences (AIIMS)", city:"New Delhi", state:"Delhi", region:"North India", lat:28.5672, lng:77.2100, type:"hospital", operator:"public", affiliation:["government","academic"], specialties:["cardiology","neurology","oncology","orthopedicSurgery","emergencyMedicine","pediatrics","gynecologyAndObstetrics","generalSurgery","internalMedicine"], capacity:2478, numberDoctors:1200, yearEstablished:1956, description:"Premier medical institution and hospital in India, offering comprehensive healthcare services and medical education.", equipment:["MRI 3T Siemens","CT Scanner 128-slice","PET-CT Scanner","Robotic Surgery System da Vinci","Cardiac Catheterization Lab","Linear Accelerator for Radiotherapy","Digital X-Ray","Echocardiography","Laparoscopic Surgery Equipment"], procedures:["Cardiac Bypass Surgery","Neurosurgery","Kidney Transplant","Liver Transplant","Bone Marrow Transplant","Coronary Angioplasty","Hip Replacement","Chemotherapy","Radiation Therapy"], capabilities:["Level I Trauma Center","ICU - 200 beds","NICU - 50 beds","Burn Unit","Stroke Care Unit","Organ Transplant Center","Cancer Care Center","Joint Commission Accredited"], phone:"+911126588500", email:"director@aiims.edu", website:"aiims.edu", acceptsVolunteers:true, medicalDesertScore:2, address_line1:"Ansari Nagar East", address_city:"New Delhi", address_stateOrRegion:"Delhi", address_zipOrPostcode:"110029", address_country:"India", address_countryCode:"IN" },
  { id:"H002", name:"Tata Memorial Hospital", city:"Mumbai", state:"Maharashtra", region:"West India", lat:18.9988, lng:72.8128, type:"hospital", operator:"public", affiliation:["government","academic"], specialties:["oncology","generalSurgery","internalMedicine","pediatrics"], capacity:629, numberDoctors:400, yearEstablished:1941, description:"India's premier cancer care and research center, affiliated with Homi Bhabha National Institute.", equipment:["Proton Therapy System","CyberKnife","PET-CT Scanner","3T MRI","Digital Mammography","Brachytherapy Machine","Flow Cytometer"], procedures:["Chemotherapy","Radiation Therapy","Bone Marrow Transplant","Cancer Surgery","Immunotherapy","Proton Therapy","Targeted Therapy"], capabilities:["Dedicated Cancer Center","Bone Marrow Transplant Unit","Palliative Care Unit","Clinical Trials Unit","Pathology Laboratory","Blood Bank"], phone:"+912224177000", email:"info@tmc.gov.in", website:"tmc.gov.in", acceptsVolunteers:true, medicalDesertScore:3, address_city:"Mumbai", address_stateOrRegion:"Maharashtra", address_zipOrPostcode:"400012", address_country:"India", address_countryCode:"IN" },
  { id:"H003", name:"Christian Medical College (CMC)", city:"Vellore", state:"Tamil Nadu", region:"South India", lat:12.9249, lng:79.1325, type:"hospital", operator:"private", affiliation:["faith-tradition","academic"], specialties:["cardiology","neurology","orthopedicSurgery","generalSurgery","internalMedicine","pediatrics","gynecologyAndObstetrics","emergencyMedicine"], capacity:2700, numberDoctors:900, yearEstablished:1900, description:"One of India's oldest and most respected medical institutions, providing comprehensive healthcare since 1900.", equipment:["3T MRI","128-Slice CT","PET Scan","Cardiac Cath Lab","Robotic Surgery","Gamma Knife","Electron Microscope","Flow Cytometer"], procedures:["Cardiac Surgery","Neurosurgery","Organ Transplant","Joint Replacement","Endoscopy","Laparoscopic Surgery","Dialysis"], capabilities:["Level I Trauma Center","Multi-organ Transplant","NICU","Burn Unit","Stroke Unit","NABH Accredited","500+ Clinical Beds ICU"], phone:"+914162282010", email:"info@cmcvellore.ac.in", website:"cmcvellore.ac.in", acceptsVolunteers:true, medicalDesertScore:3, address_city:"Vellore", address_stateOrRegion:"Tamil Nadu", address_zipOrPostcode:"632004", address_country:"India", address_countryCode:"IN" },
  { id:"H004", name:"Apollo Hospitals", city:"Chennai", state:"Tamil Nadu", region:"South India", lat:13.0600, lng:80.2824, type:"hospital", operator:"private", affiliation:["community"], specialties:["cardiology","oncology","orthopedicSurgery","neurology","generalSurgery","internalMedicine"], capacity:700, numberDoctors:400, yearEstablished:1983, description:"Asia's largest healthcare group, pioneering world-class clinical care with cutting-edge technology.", equipment:["4D Echo Machine","3T MRI","256-Slice CT","PET-CT","CyberKnife","Da Vinci Robot","TAVI System"], procedures:["TAVI Procedure","CAR-T Cell Therapy","Bariatric Surgery","Robotic Surgery","Liver Transplant","Prostate Brachytherapy"], capabilities:["JCI Accredited","NABH Accredited","Level I Trauma Center","Cardiac Catheterization Lab x3","Bone Marrow Transplant","NICU 40 beds"], phone:"+914428296000", email:"info@apollohospitals.com", website:"apollohospitals.com", acceptsVolunteers:false, medicalDesertScore:2, address_city:"Chennai", address_stateOrRegion:"Tamil Nadu", address_zipOrPostcode:"600006", address_country:"India", address_countryCode:"IN" },
  { id:"H005", name:"PGIMER", city:"Chandigarh", state:"Punjab", region:"North India", lat:30.7650, lng:76.7775, type:"hospital", operator:"public", affiliation:["government","academic"], specialties:["cardiology","neurology","internalMedicine","generalSurgery","pediatrics","emergencyMedicine"], capacity:1754, numberDoctors:600, yearEstablished:1962, description:"A premier medical research and teaching institute in North India providing tertiary healthcare.", equipment:["3T MRI","64-Slice CT","PET Scan","Cardiac Cath Lab x2","ECMO Machine","Bone Marrow Lab"], procedures:["Cardiac Surgery","Liver Transplant","Kidney Transplant","Neurosurgery","Bone Marrow Transplant","Dialysis"], capabilities:["Advanced Cardiac Care","Liver Transplant Unit","Trauma Center","ICU 150 beds","NICU 60 beds","Hemodialysis 3x weekly"], phone:"+911722756565", email:"director@pgimer.edu.in", website:"pgimer.edu.in", acceptsVolunteers:true, medicalDesertScore:3, address_city:"Chandigarh", address_stateOrRegion:"Punjab", address_zipOrPostcode:"160012", address_country:"India", address_countryCode:"IN" },
  { id:"H006", name:"Fortis Memorial Research Institute", city:"Gurugram", state:"Haryana", region:"North India", lat:28.4595, lng:77.0266, type:"hospital", operator:"private", affiliation:["community"], specialties:["cardiology","orthopedicSurgery","oncology","neurology","generalSurgery"], capacity:310, numberDoctors:250, yearEstablished:2013, description:"Super-specialty quaternary care hospital with international standards.", equipment:["3T MRI","256-Slice CT","PET-CT","Da Vinci Robot","Gamma Knife","Hybrid Cath Lab"], procedures:["Robotic Surgery","Cardiac Bypass","Knee/Hip Replacement","Spine Surgery","Stereotactic Radiosurgery"], capabilities:["JCI Accredited","NABH Accredited","Level II Trauma Center","ICU 80 beds","NICU 30 beds"], phone:"+911244962200", email:"fmri@fortishealthcare.com", website:"fortishealthcare.com", acceptsVolunteers:false, medicalDesertScore:2, address_city:"Gurugram", address_stateOrRegion:"Haryana", address_zipOrPostcode:"122002", address_country:"India", address_countryCode:"IN" },
  { id:"H007", name:"District Hospital Bastar", city:"Jagdalpur", state:"Chhattisgarh", region:"Central India", lat:19.0748, lng:82.0330, type:"hospital", operator:"public", affiliation:["government"], specialties:["generalSurgery","internalMedicine","pediatrics","gynecologyAndObstetrics","emergencyMedicine"], capacity:200, numberDoctors:18, yearEstablished:1975, description:"Primary government hospital serving the tribal Bastar district with limited specialist resources.", equipment:["Basic X-Ray","Ultrasound Machine","Basic Lab Equipment","Emergency Generator"], procedures:["Basic Surgery","Normal Delivery","Appendectomy","Basic Emergency Care","Blood Transfusion"], capabilities:["Basic Emergency Care","Maternity Ward 30 beds","Pediatric Ward 20 beds","Blood Bank","Basic ICU 5 beds"], phone:"+917782230035", email:"", website:"", acceptsVolunteers:true, medicalDesertScore:8, address_city:"Jagdalpur", address_stateOrRegion:"Chhattisgarh", address_zipOrPostcode:"494001", address_country:"India", address_countryCode:"IN" },
  { id:"H008", name:"Primary Health Centre Malkangiri", city:"Malkangiri", state:"Odisha", region:"East India", lat:18.3506, lng:81.8875, type:"clinic", operator:"public", affiliation:["government"], specialties:["familyMedicine","gynecologyAndObstetrics","pediatrics"], capacity:30, numberDoctors:2, yearEstablished:1988, description:"Remote primary health centre in one of India's most underdeveloped districts serving tribal communities.", equipment:["Basic X-Ray (non-functional)","Glucometer","BP Monitor","Weighing Scale"], procedures:["Basic OPD","Normal Delivery","Vaccination","First Aid","Basic Lab Tests"], capabilities:["OPD Services","Maternity Room 5 beds","Basic Lab","24/7 Emergency (limited)"], phone:"+916861230121", email:"", website:"", acceptsVolunteers:true, medicalDesertScore:10, address_city:"Malkangiri", address_stateOrRegion:"Odisha", address_zipOrPostcode:"764045", address_country:"India", address_countryCode:"IN" },
  { id:"H009", name:"Community Health Centre Kishanganj", city:"Kishanganj", state:"Bihar", region:"East India", lat:26.0960, lng:87.9442, type:"clinic", operator:"public", affiliation:["government"], specialties:["familyMedicine","pediatrics","gynecologyAndObstetrics"], capacity:50, numberDoctors:4, yearEstablished:1992, description:"Government community health centre in one of the most deprived districts of India.", equipment:["Ultrasound (outdated)","Basic X-Ray","Basic Lab","Delivery Table"], procedures:["Normal Delivery","OPD Services","Vaccination","Basic Surgery (minor)"], capabilities:["30-bed Ward","Maternity Ward","OPD","Emergency Care (basic)"], phone:"+916456220018", email:"", website:"", acceptsVolunteers:true, medicalDesertScore:9, address_city:"Kishanganj", address_stateOrRegion:"Bihar", address_zipOrPostcode:"855107", address_country:"India", address_countryCode:"IN" },
  { id:"H010", name:"Medanta - The Medicity", city:"Gurugram", state:"Haryana", region:"North India", lat:28.4484, lng:77.0428, type:"hospital", operator:"private", affiliation:["community"], specialties:["cardiology","neurology","orthopedicSurgery","oncology","internalMedicine","generalSurgery","gynecologyAndObstetrics"], capacity:1250, numberDoctors:800, yearEstablished:2009, description:"One of India's largest multi-super-specialty institutes.", equipment:["3T MRI x4","320-Slice CT","PET-CT x2","Da Vinci Robot x2","Proton Beam Therapy","ECMO x10","Hybrid OR"], procedures:["Heart Transplant","Liver Transplant","Robotic Surgery","Proton Therapy","CAR-T Cell Therapy","Spine Surgery"], capabilities:["JCI Accredited","NABH Accredited","Heart Transplant Center","Multi-organ Transplant","ICU 200 beds","NICU 50 beds","Level I Trauma Center"], phone:"+911244141414", email:"info@medanta.org", website:"medanta.org", acceptsVolunteers:false, medicalDesertScore:1, address_city:"Gurugram", address_stateOrRegion:"Haryana", address_zipOrPostcode:"122001", address_country:"India", address_countryCode:"IN" },
  { id:"H011", name:"Narayana Health City", city:"Bengaluru", state:"Karnataka", region:"South India", lat:12.9105, lng:77.6469, type:"hospital", operator:"private", affiliation:["community","philanthropy-legacy"], specialties:["cardiology","oncology","orthopedicSurgery","generalSurgery","pediatrics"], capacity:3000, numberDoctors:500, yearEstablished:2000, description:"World's largest cardiac care hospital.", equipment:["Cath Lab x8","3T MRI x3","256-Slice CT x4","PET-CT x2","Robotic Surgery"], procedures:["Cardiac Surgery 30/day","Bypass Surgery","Valve Replacement","Pediatric Cardiac Surgery","Heart Transplant"], capabilities:["JCI Accredited","NABH Accredited","Cardiac Surgery 30/day","NICU 100 beds","ICU 200 beds","Largest Cardiac Program India"], phone:"+918067775000", email:"info@narayanahealth.org", website:"narayanahealth.org", acceptsVolunteers:true, medicalDesertScore:2, address_city:"Bengaluru", address_stateOrRegion:"Karnataka", address_zipOrPostcode:"560099", address_country:"India", address_countryCode:"IN" },
  { id:"H012", name:"Sub-District Hospital Kishori", city:"Kishori", state:"Uttar Pradesh", region:"North India", lat:26.8504, lng:80.9499, type:"clinic", operator:"public", affiliation:["government"], specialties:["familyMedicine","gynecologyAndObstetrics"], capacity:25, numberDoctors:1, yearEstablished:2001, description:"Rural sub-district hospital in UP serving large rural population with minimal infrastructure.", equipment:["BP Monitor","Glucometer","Non-functional X-Ray"], procedures:["OPD only","Basic First Aid"], capabilities:["OPD only - No inpatient","No emergency care","No specialist","No lab"], phone:"", email:"", website:"", acceptsVolunteers:true, medicalDesertScore:10, address_city:"Kishori", address_stateOrRegion:"Uttar Pradesh", address_zipOrPostcode:"226301", address_country:"India", address_countryCode:"IN" },
  { id:"H013", name:"JIPMER", city:"Puducherry", state:"Puducherry", region:"South India", lat:11.9416, lng:79.8083, type:"hospital", operator:"public", affiliation:["government","academic"], specialties:["cardiology","neurology","generalSurgery","internalMedicine","pediatrics","emergencyMedicine"], capacity:1782, numberDoctors:650, yearEstablished:1823, description:"One of India's oldest government medical institutions.", equipment:["3T MRI","128-Slice CT","PET Scan","Cardiac Cath Lab","ECMO","Dialysis x20"], procedures:["Cardiac Surgery","Neurosurgery","Dialysis","Transplant","Oncology","Trauma Surgery"], capabilities:["Level I Trauma Center","ICU 100 beds","NICU 40 beds","Cardiac ICU","Neurosurgery ICU","Burns Unit"], phone:"+914132272380", email:"director@jipmer.edu.in", website:"jipmer.edu.in", acceptsVolunteers:true, medicalDesertScore:3, address_city:"Puducherry", address_stateOrRegion:"Puducherry", address_zipOrPostcode:"605006", address_country:"India", address_countryCode:"IN" },
  { id:"H014", name:"District Hospital Nandurbar", city:"Nandurbar", state:"Maharashtra", region:"West India", lat:21.3693, lng:74.2399, type:"hospital", operator:"public", affiliation:["government"], specialties:["generalSurgery","gynecologyAndObstetrics","pediatrics","internalMedicine","emergencyMedicine"], capacity:100, numberDoctors:12, yearEstablished:1980, description:"District hospital in one of Maharashtra's most tribal and underdeveloped districts.", equipment:["Basic X-Ray","Ultrasound","ECG","Basic Lab"], procedures:["C-Section","Appendectomy","Normal Delivery","Basic Emergency"], capabilities:["50-bed Ward","Maternity Ward 20 beds","ICU 4 beds (no ventilator)","Blood Bank (limited)"], phone:"+912564210085", email:"", website:"", acceptsVolunteers:true, medicalDesertScore:8, address_city:"Nandurbar", address_stateOrRegion:"Maharashtra", address_zipOrPostcode:"425412", address_country:"India", address_countryCode:"IN" },
  { id:"H015", name:"Manipal Hospital", city:"Bengaluru", state:"Karnataka", region:"South India", lat:12.9783, lng:77.6408, type:"hospital", operator:"private", affiliation:["academic"], specialties:["cardiology","orthopedicSurgery","neurology","oncology","internalMedicine","generalSurgery"], capacity:600, numberDoctors:350, yearEstablished:1991, description:"Premier multi-specialty hospital and teaching institution in Bengaluru.", equipment:["3T MRI x2","128-Slice CT x2","PET-CT","Robotic Surgery","TAVI System","Hybrid OR"], procedures:["Robotic Surgery","TAVI","Cardiac Surgery","Neurosurgery","Cancer Surgery","Joint Replacement"], capabilities:["NABH Accredited","JCI Accredited","Level II Trauma","ICU 80 beds","NICU 30 beds","Cardiac ICU 20 beds"], phone:"+918025024444", email:"info@manipalhospitals.com", website:"manipalhospitals.com", acceptsVolunteers:false, medicalDesertScore:2, address_city:"Bengaluru", address_stateOrRegion:"Karnataka", address_zipOrPostcode:"560017", address_country:"India", address_countryCode:"IN" },
  { id:"H016", name:"Kalinga Institute of Medical Sciences (KIMS/KISS)", city:"Bhubaneswar", state:"Odisha", region:"East India", lat:20.3533, lng:85.8117, type:"hospital", operator:"private", affiliation:["academic","philanthropy-legacy"], specialties:["cardiology","neurology","orthopedicSurgery","oncology","pediatrics","generalSurgery","internalMedicine","emergencyMedicine"], capacity:2000, numberDoctors:450, yearEstablished:2007, description:"A premier healthcare institution and teaching hospital in Odisha, part of KIIT University and associated with KISS.", equipment:["3T MRI","128-Slice CT","Cardiac Cath Lab","PET-CT","Advanced NICU","Digital Radiology"], procedures:["Cardiac Surgery","Joint Replacement","Cancer Surgery","Neurosurgery","Dialysis","Advanced Pediatric Care"], capabilities:["NABH Accredited","NABL Accredited","Level I Trauma Center","100+ ICU Beds","Comprehensive Cancer Center"], phone:"+916742725182", email:"info@kims.ac.in", website:"kims.ac.in", acceptsVolunteers:true, medicalDesertScore:3, address_city:"Bhubaneswar", address_stateOrRegion:"Odisha", address_zipOrPostcode:"751024", address_country:"India", address_countryCode:"IN" }
];

export const DOCTORS = [
  { id:"D001", name:"Dr. Devi Prasad Shetty", specialty:"cardiology", subSpecialty:"Cardiac Surgery", hospital:"Narayana Health City", hospitalId:"H011", city:"Bengaluru", state:"Karnataka", lat:12.9105, lng:77.6469, experience:35, qualifications:["MBBS","MS","FRCS (Edinburgh)","FRCS (Glasgow)"], procedures:["Cardiac Bypass Surgery","Heart Transplant","Valve Replacement","Pediatric Cardiac Surgery"], languages:["English","Hindi","Kannada"], consultationFee:1500, availableForTransfer:false, phone:"+918067775100" },
  { id:"D002", name:"Dr. Naresh Trehan", specialty:"cardiology", subSpecialty:"Cardiothoracic Surgery", hospital:"Medanta - The Medicity", hospitalId:"H010", city:"Gurugram", state:"Haryana", lat:28.4484, lng:77.0428, experience:40, qualifications:["MBBS","MS","FACS","FACC"], procedures:["Heart Transplant","LVAD Implantation","Aortic Surgery","Minimally Invasive Cardiac Surgery"], languages:["English","Hindi"], consultationFee:2000, availableForTransfer:false, phone:"+911244141415" },
  { id:"D003", name:"Dr. Priya Sharma", specialty:"gynecologyAndObstetrics", subSpecialty:"High-Risk Obstetrics", hospital:"District Hospital Bastar", hospitalId:"H007", city:"Jagdalpur", state:"Chhattisgarh", lat:19.0748, lng:82.0330, experience:12, qualifications:["MBBS","MD (OBG)"], procedures:["C-Section","Hysterectomy","Laparoscopy","High-risk Delivery Management"], languages:["Hindi","Chhattisgarhi","English"], consultationFee:200, availableForTransfer:true, phone:"+917782230036" },
  { id:"D004", name:"Dr. Ramesh Kumar Verma", specialty:"internalMedicine", subSpecialty:"Tropical Medicine & Infectious Disease", hospital:"Community Health Centre Kishanganj", hospitalId:"H009", city:"Kishanganj", state:"Bihar", lat:26.0960, lng:87.9442, experience:8, qualifications:["MBBS","MD (Medicine)"], procedures:["Malaria Management","Kala-azar Treatment","Dengue Management","TB Management"], languages:["Hindi","Maithili","Bengali","English"], consultationFee:100, availableForTransfer:true, phone:"+916456220019" },
  { id:"D005", name:"Dr. Ashok Rajgopal", specialty:"orthopedicSurgery", subSpecialty:"Knee & Hip Replacement", hospital:"Medanta - The Medicity", hospitalId:"H010", city:"Gurugram", state:"Haryana", lat:28.4484, lng:77.0428, experience:30, qualifications:["MBBS","MS (Ortho)","MCh (Ortho)","Fellowship (UK)"], procedures:["Total Knee Replacement","Hip Replacement","Unicondylar Knee Replacement","Revision Joint Surgery"], languages:["English","Hindi","Kannada"], consultationFee:1800, availableForTransfer:false, phone:"+911244141416" },
  { id:"D006", name:"Dr. Sunita Maheshwari", specialty:"pediatrics", subSpecialty:"Pediatric Cardiology", hospital:"Narayana Health City", hospitalId:"H011", city:"Bengaluru", state:"Karnataka", lat:12.9105, lng:77.6469, experience:25, qualifications:["MBBS","MD (Pediatrics)","DM (Pediatric Cardiology)"], procedures:["Pediatric Cardiac Catheterization","Balloon Valvotomy","ASD/VSD Closure","Pediatric Echo"], languages:["English","Hindi","Kannada","Tamil"], consultationFee:800, availableForTransfer:false, phone:"+918067775101" },
  { id:"D007", name:"Dr. Anil Kumar Singh", specialty:"generalSurgery", subSpecialty:"Emergency & Trauma Surgery", hospital:"District Hospital Nandurbar", hospitalId:"H014", city:"Nandurbar", state:"Maharashtra", lat:21.3693, lng:74.2399, experience:15, qualifications:["MBBS","MS (Surgery)"], procedures:["Emergency Laparotomy","Appendectomy","Hernia Repair","Wound Debridement"], languages:["Hindi","Marathi","English"], consultationFee:150, availableForTransfer:true, phone:"+912564210086" },
  { id:"D008", name:"Dr. Meera Patel", specialty:"familyMedicine", subSpecialty:"Rural & Community Medicine", hospital:"PHC Malkangiri", hospitalId:"H008", city:"Malkangiri", state:"Odisha", lat:18.3506, lng:81.8875, experience:6, qualifications:["MBBS"], procedures:["OPD Consultations","Vaccination","Antenatal Care","Malaria Diagnosis"], languages:["Hindi","Odia","English"], consultationFee:0, availableForTransfer:true, phone:"+916861230122" },
  { id:"D009", name:"Dr. K. M. Cherian", specialty:"cardiology", subSpecialty:"Pediatric & Congenital Heart Disease", hospital:"Christian Medical College (CMC)", hospitalId:"H003", city:"Vellore", state:"Tamil Nadu", lat:12.9249, lng:79.1325, experience:42, qualifications:["MBBS","MS","MCh","PhD","DSc"], procedures:["Congenital Heart Repair","Ross Procedure","Fontan Procedure","Neonatal Cardiac Surgery"], languages:["English","Tamil","Hindi","Malayalam"], consultationFee:1200, availableForTransfer:false, phone:"+914162282011" },
  { id:"D010", name:"Dr. Rajesh Kapoor", specialty:"neurology", subSpecialty:"Stroke & Neuro-intervention", hospital:"AIIMS", hospitalId:"H001", city:"New Delhi", state:"Delhi", lat:28.5672, lng:77.2100, experience:22, qualifications:["MBBS","MD (Medicine)","DM (Neurology)","Fellowship (USA)"], procedures:["Stroke Thrombolysis","Mechanical Thrombectomy","Carotid Stenting","Intracranial Angioplasty"], languages:["English","Hindi"], consultationFee:600, availableForTransfer:false, phone:"+911126588501" }
];

// --- DATA GENERATOR (Simulating 100+ items) ---
const IndianStates = [
  "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", 
  "Uttar Pradesh", "West Bengal", "Rajasthan", "Kerala", "Bihar",
  "Odisha", "Assam", "Punjab", "Haryana", "Chhattisgarh", "Telangana",
  "Madhya Pradesh", "Andhra Pradesh", "Jharkhand", "Himachal Pradesh"
];
const HospitalNames = ["City Hospital", "Apex Medical Center", "LifeCare Hospital", "Sanjeevani Clinic", "Fortis Branch", "Apollo Branch", "District Hospital", "General Hospital", "Carewell Hospital", "Metro Healthcare", "Global Health Institute", "Reliance Medical", "Star Hospital", "Healing Touch"];
const DoctorFirstNames = ["Amit", "Ravi", "Suresh", "Priya", "Anjali", "Vikram", "Sneha", "Karan", "Pooja", "Rajesh", "Neha", "Ramesh", "Deepa", "Sunil", "Manish", "Kavita", "Rahul", "Swati"];
const DoctorLastNames = ["Sharma", "Patel", "Singh", "Reddy", "Kumar", "Gupta", "Desai", "Rao", "Joshi", "Verma", "Chauhan", "Menon", "Kulkarni", "Misra", "Nair"];
const SpecialtiesList = ["cardiology", "neurology", "oncology", "orthopedicSurgery", "emergencyMedicine", "pediatrics", "gynecologyAndObstetrics", "generalSurgery", "internalMedicine", "familyMedicine"];

// Generate 1000+ Hospitals
for (let i = 17; i <= 1017; i++) {
  const state = IndianStates[Math.floor(Math.random() * IndianStates.length)];
  const name = HospitalNames[Math.floor(Math.random() * HospitalNames.length)] + " " + state;
  const lat = 8 + Math.random() * 29;
  const lng = 68 + Math.random() * 29;
  
  HOSPITALS.push({
    id: `H${i.toString().padStart(4, '0')}`,
    name,
    city: state + " City",
    state: state,
    region: "India",
    lat, lng,
    type: Math.random() > 0.8 ? "clinic" : "hospital",
    operator: Math.random() > 0.5 ? "private" : "public",
    affiliation: ["community"],
    specialties: [SpecialtiesList[Math.floor(Math.random() * SpecialtiesList.length)], SpecialtiesList[Math.floor(Math.random() * SpecialtiesList.length)]],
    capacity: Math.floor(Math.random() * 500) + 50,
    numberDoctors: Math.floor(Math.random() * 100) + 10,
    yearEstablished: 1950 + Math.floor(Math.random() * 70),
    description: "A generated regional hospital facility providing standard healthcare services.",
    equipment: ["Basic X-Ray", "Ultrasound", "Lab"],
    procedures: ["General Surgery", "OPD"],
    capabilities: ["Emergency Care", "ICU 10 beds"],
    phone: "+91 800 555 " + (1000 + i),
    email: `contact@${name.replace(/\s+/g, '').toLowerCase()}.in`,
    website: `${name.replace(/\s+/g, '').toLowerCase()}.in`,
    acceptsVolunteers: Math.random() > 0.5,
    medicalDesertScore: Math.floor(Math.random() * 10) + 1
  });
}

// Generate 1000+ Doctors
for (let i = 11; i <= 1011; i++) {
  const fName = DoctorFirstNames[Math.floor(Math.random() * DoctorFirstNames.length)];
  const lName = DoctorLastNames[Math.floor(Math.random() * DoctorLastNames.length)];
  const state = IndianStates[Math.floor(IndianStates.length * Math.random())];
  const spec = SpecialtiesList[Math.floor(SpecialtiesList.length * Math.random())];
  
  DOCTORS.push({
    id: `D${i.toString().padStart(4, '0')}`,
    name: `Dr. ${fName} ${lName}`,
    specialty: spec,
    subSpecialty: "General " + spec,
    hospital: "Regional Hospital",
    hospitalId: "H016", // random
    city: state + " City",
    state: state,
    lat: 8 + Math.random() * 29,
    lng: 68 + Math.random() * 29,
    experience: Math.floor(Math.random() * 30) + 2,
    qualifications: ["MBBS", "MD"],
    procedures: ["Consultation"],
    languages: ["English", "Hindi"],
    consultationFee: Math.floor(Math.random() * 1000) + 200,
    availableForTransfer: Math.random() > 0.7,
    phone: "+91 900 555 " + (1000 + i)
  });
}
// --- END DATA GENERATOR ---

export const NGOS = [
  { id:"N001", name:"Doctors For You", type:"ngo", city:"Mumbai", state:"Maharashtra", lat:19.0760, lng:72.8777, yearEstablished:2007, missionStatement:"To provide need-based healthcare to the most vulnerable communities in India.", specialties:["emergencyMedicine","internalMedicine","pediatrics","generalSurgery"], regionsServed:["Chhattisgarh","Odisha","Bihar","Assam","UP"], phone:"+912224183858", email:"info@doctorsforyou.org", website:"doctorsforyou.org", acceptsVolunteers:true, description:"Deploys medical professionals in remote and disaster-affected areas." },
  { id:"N002", name:"Jan Swasthya Sahyog (JSS)", type:"ngo", city:"Bilaspur", state:"Chhattisgarh", lat:22.0797, lng:82.1409, yearEstablished:1999, missionStatement:"To provide primary healthcare to tribal and rural communities in Chhattisgarh.", specialties:["familyMedicine","pediatrics","gynecologyAndObstetrics","internalMedicine"], regionsServed:["Bilaspur","Bastar","Raipur"], phone:"+917752247190", email:"jss@jssbilaspur.org", website:"jssbilaspur.org", acceptsVolunteers:true, description:"Rural health initiative in tribal areas." },
  { id:"N003", name:"MSF India (Médecins Sans Frontières)", type:"ngo", city:"New Delhi", state:"Delhi", lat:28.6139, lng:77.2090, yearEstablished:1971, missionStatement:"Providing independent medical humanitarian assistance to those in greatest need.", specialties:["emergencyMedicine","internalMedicine","pediatrics","gynecologyAndObstetrics"], regionsServed:["Manipur","Bihar","Mumbai"], phone:"+911141682900", email:"office-india@msf.org", website:"msfindia.in", acceptsVolunteers:true, description:"Emergency medical aid in conflict and crisis situations." }
];

// Map coordinate conversion (approximate for India)
// India lat: 8 to 37, lng: 68 to 97
export function coordToPercent(lat, lng) {
  const latMin = 8, latMax = 37, lngMin = 68, lngMax = 97;
  const x = ((lng - lngMin) / (lngMax - lngMin)) * 100;
  const y = ((latMax - lat) / (latMax - latMin)) * 100;
  return { x, y };
}

export function getDesertLabel(score) {
  if (score <= 3) return "Well-served";
  if (score <= 5) return "Moderate";
  if (score <= 7) return "Underserved";
  if (score <= 8) return "Critical";
  return "Severe Desert";
}

export function getScoreClass(score) {
  if (score <= 2) return "score-2";
  if (score <= 4) return "score-4";
  if (score <= 6) return "score-6";
  if (score <= 8) return "score-8";
  return "score-10";
}

export function getPinClass(score) {
  if (score <= 3) return "pin-good";
  if (score <= 6) return "pin-medium";
  if (score <= 8) return "pin-bad";
  return "pin-critical";
}

export function specialtyLabel(s) {
  const map = {
    cardiology:"Cardiology", neurology:"Neurology", oncology:"Oncology",
    orthopedicSurgery:"Orthopedic Surgery", emergencyMedicine:"Emergency Medicine",
    pediatrics:"Pediatrics", gynecologyAndObstetrics:"Gynecology & OB",
    generalSurgery:"General Surgery", internalMedicine:"Internal Medicine",
    familyMedicine:"Family Medicine", ophthalmology:"Ophthalmology",
    dentistry:"Dentistry"
  };
  return map[s] || s;
}

export function typeIcon(type) {
  if (type === "hospital") return "🏥";
  if (type === "clinic") return "🏨";
  if (type === "doctor") return "👨‍⚕️";
  if (type === "ngo") return "🤝";
  return "🏥";
}
