import { useLocation } from "react-router-dom";
import "./schoolUpdate.css";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import useFetch from "../../useFetch";
import axios from "axios";

const SchoolUpdate = () => {
  const location = useLocation();
  // console.log(location.state)
  const id = location.state;

  // fetch school
  const { apiData, isLoading } = useFetch(
    `http://localhost:5000/schools/${id}`
  );
  // console.log(apiData);

  let lgaList;

  const [credentials, setCredentials] = useState({
    name: undefined,
    address: undefined,
    phone: undefined,
    desc: undefined,
    state: undefined,
    lga: undefined,
    category: undefined,
    city: undefined,
    googleRating: undefined,
    email: undefined,
    website: undefined,
    feeRange: undefined,
    googleProfile: undefined,
  });

  switch (credentials.state) {
    case "Abia":
      lgaList = [
        "Select LGA",
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikwuano",
        "Isiala Ngwa North",
        "Isiala Ngwa South",
        "Isuikwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "muahia South",
        "Umu Nneochi",
      ];
      break;
    case "Abuja":
      lgaList = [
        "Select LGA",
        "Abaji",
        "Abuja Municipal",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
      ];
      break;
    case "Adamawa":
      lgaList = [
        "Select LGA",
        "Demsa",
        "Fufure",
        "Ganye",
        "Gayuk",
        "Gombi",
        "Grie",
        "Hong",
        "Jada",
        "Larmurde",
        "Madagali",
        "Maiha",
        "Mayo Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ];
      break;
    case "AkwaIbom":
      lgaList = [
        "Select LGA",
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong Oruko",
        "Uyo",
      ];
      break;

    case "Anambra":
      lgaList = [
        "Select LGA",
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi",
      ];
      break;

    case "Bauchi":
      lgaList = [
        "Select LGA",
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas-Gadau",
        "Jama are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa Balewa",
        " Toro",
        " Warji",
        " Zaki",
      ];
      break;
    case "Bayelsa":
      lgaList = [
        "Select LGA",
        "Brass",
        "Ekeremor",
        "Kolokuma Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Ijaw",
        "Yenagoa",
      ];
      break;
    case "Benue":
      lgaList = [
        "Select LGA",
        "Agatu",
        "Apa",
        "Ado",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Obi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
      ];
      break;
    case "Borno":
      lgaList = [
        "Select LGA",
        "Abadam",
        "Askira-Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala-Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
      ];
      break;

    case "Cross River":
      lgaList = [
        "Select LGA",
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar Municipal",
        "Calabar South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakuur",
        "Yala",
      ];
      break;
    case "Delta":
      lgaList = [
        "Select LGA",
        "Aniocha North",
        "Aniocha South",
        "Bomadi",
        "Burutu",
        "Ethiope East",
        "Ethiope West",
        "Ika North East",
        "Ika South",
        "Isoko North",
        "Isoko South",
        "Ndokwa East",
        "Ndokwa West",
        "Okpe",
        "Oshimili North",
        "Oshimili South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli North",
        "Ughelli South",
        "Ukwuani",
        "Uvwie",
        "Warri North",
        "Warri South",
        "Warri South West",
      ];
      break;

    case "Ebonyi":
      lgaList = [
        "Select LGA",
        "Abakaliki",
        "Afikpo North",
        "Afikpo South",
        "Ebonyi",
        "Ezza North",
        "Ezza South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaozara",
        "Ohaukwu",
        "Onicha",
      ];
      break;
    case "Edo":
      lgaList = [
        "Select LGA",
        "Akoko-Edo",
        "Egor",
        "Esan Central",
        "Esan North-East",
        "Esan South-East",
        "Esan West",
        "Etsako Central",
        "Etsako East",
        "Etsako West",
        "Igueben",
        "Ikpoba Okha",
        "Orhionmwon",
        "Oredo",
        "Ovia North-East",
        "Ovia South-West",
        "Owan East",
        "Owan West",
        "Uhunmwonde",
      ];
      break;

    case "Ekiti":
      lgaList = [
        "Select LGA",
        "Ado Ekiti",
        "Efon",
        "Ekiti East",
        "Ekiti South-West",
        "Ekiti West",
        "Emure",
        "Gbonyin",
        "Ido Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun-Ifelodun",
        "Ise-Orun",
        "Moba",
        "Oye",
      ];
      break;
    case "Rivers":
      lgaList = [
        "Select LGA",
        "Port Harcourt",
        "Obio-Akpor",
        "Okrika",
        "Ogu–Bolo",
        "Eleme",
        "Tai",
        "Gokana",
        "Khana",
        "Oyigbo",
        "Opobo–Nkoro",
        "Andoni",
        "Bonny",
        "Degema",
        "Asari-Toru",
        "Akuku-Toru",
        "Abua–Odual",
        "Ahoada West",
        "Ahoada East",
        "Ogba–Egbema–Ndoni",
        "Emohua",
        "Ikwerre",
        "Etche",
        "Omuma",
      ];
      break;
    case "Enugu":
      lgaList = [
        "Select LGA",
        "Aninri",
        "Awgu",
        "Enugu East",
        "Enugu North",
        "Enugu South",
        "Ezeagu",
        "Igbo Etiti",
        "Igbo Eze North",
        "Igbo Eze South",
        "Isi Uzo",
        "Nkanu East",
        "Nkanu West",
        "Nsukka",
        "Oji River",
        "Udenu",
        "Udi",
        "Uzo Uwani",
      ];
      break;
    case "FCT":
      lgaList = [
        "Select LGA",
        "Abaji",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
        "Municipal Area Council",
      ];
      break;
    case "Gombe":
      lgaList = [
        "Select LGA",
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu-Deba",
      ];
      break;
    case "Imo":
      lgaList = [
        "Select LGA",
        "Aboh Mbaise",
        "Ahiazu Mbaise",
        "Ehime Mbano",
        "Ezinihitte",
        "Ideato North",
        "Ideato South",
        "Ihitte-Uboma",
        "Ikeduru",
        "Isiala Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji-Egbema",
        "Okigwe",
        "Orlu",
        "Orsu",
        "Oru East",
        "Oru West",
        "Owerri Municipal",
        "Owerri North",
        "Owerri West",
        "Unuimo",
      ];
      break;
    case "Jigawa":
      lgaList = [
        "Select LGA",
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin Hausa",
        "Kazaure",
        "Kiri Kasama",
        "Kiyawa",
        "Kaugama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule Tankarkar",
        "Taura",
        "Yankwashi",
      ];
      break;
    case "Kaduna":
      lgaList = [
        "Select LGA",
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria",
      ];
      break;
    case "Kano":
      lgaList = [
        "Select LGA",
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun Wada",
        "Ungogo",
        "Warawa",
        "Wudil",
      ];
      break;
    case "Katsina":
      lgaList = [
        "Select LGA",
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dandume",
        "Danja",
        "Dan Musa",
        "Daura",
        "Dutsi",
        "Dutsin Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango",
      ];
      break;
    case "Kebbi":
      lgaList = [
        "Select LGA",
        "Aleiro",
        "Arewa Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu Danko",
        "Yauri",
        "Zuru",
      ];
      break;
    case "Kogi":
      lgaList = [
        "Select LGA",
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Bassa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela Odolu",
        "Ijumu",
        "Kabba Bunu",
        "Kogi",
        "Lokoja",
        "Mopa Muro",
        "Ofu",
        "Ogori Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Yagba East",
        "Yagba West",
      ];
      break;
    case "Kwara":
      lgaList = [
        "Select LGA",
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti",
        "Ifelodun",
        "Ilorin East",
        "Ilorin South",
        "Ilorin West",
        "Irepodun",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke Ero",
        "Oyun",
        "Pategi",
      ];
      break;
    case "Lagos":
      lgaList = [
        "Select LGA",
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Lagos Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
      ];
      break;
    case "Nasarawa":
      lgaList = [
        "Select LGA",
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa Egon",
        "Obi",
        "Toto",
        "Wamba",
      ];
      break;
    case "Niger":
      lgaList = [
        "Select LGA",
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi",
      ];
      break;
    case "Ogun":
      lgaList = [
        "Select LGA",
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo Ota",
        "Egbado North",
        "Egbado South",
        "Ewekoro",
        "Ifo",
        "Ijebu East",
        "Ijebu North",
        "Ijebu North East",
        "Ijebu Ode",
        "Ikenne",
        "Imeko Afon",
        "Ipokia",
        "Obafemi Owode",
        "Odeda",
        "Odogbolu",
        "Ogun Waterside",
        "Remo North",
        "Shagamu",
      ];
      break;
    case "Ondo":
      lgaList = [
        "Select LGA",
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure North",
        "Akure South",
        "Ese Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile Oluji-Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo East",
        "Ondo West",
        "Ose",
        "Owo",
      ];
      break;
    case "Osun":
      lgaList = [
        "Select LGA",
        "Atakunmosa East",
        "Atakunmosa West",
        "Aiyedaade",
        "Aiyedire",
        "Boluwaduro",
        "Boripe",
        "Ede North",
        "Ede South",
        "Ife Central",
        "Ife East",
        "Ife North",
        "Ife South",
        "Egbedore",
        "Ejigbo",
        "Ifedayo",
        "Ifelodun",
        "Ila",
        "Ilesa East",
        "Ilesa West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo",
      ];
      break;
    case "Oyo":
      lgaList = [
        "Select LGA",
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa Central",
        "Ibarapa East",
        "Ibarapa North",
        "Ido",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Ori Ire",
        "Oyo",
        "Oyo East",
        "Saki East",
        "Saki West",
        "Surulere",
      ];
      break;
    case "Plateau":
      lgaList = [
        "Select LGA",
        "Bokkos",
        "Barkin Ladi",
        "Bassa",
        "Jos East",
        "Jos North",
        "Jos South",
        "Kanam",
        "Kanke",
        "Langtang South",
        "Langtang North",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua an Pan",
        "Riyom",
        "Shendam",
        "Wase",
      ];
      break;
    case "Sokoto":
      lgaList = [
        "Select LGA",
        "Binji",
        "Bodinga",
        "Dange Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Isa",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto North",
        "Sokoto South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
      ];
      break;
    case "Taraba":
      lgaList = [
        "Select LGA",
        "Ardo Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim Lamido",
        "Kumi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing",
      ];
      break;
    case "Yobe":
      lgaList = [
        "Select LGA",
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari",
      ];
      break;
    case "Zamfara":
      lgaList = [
        "Select LGA",
        "Anka",
        "Bakura",
        "Birnin Magaji Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Kaura Namoda",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata Mafara",
        "Chafe",
        "Zurmi",
      ];
      break;
    default:
      lgaList = ["Select A State to see your LGAs"];
      break;
  }

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e, schoolId) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/schools/${schoolId}`, credentials);
      // console.log(res.data); - to use this set const res = axios call
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="SchoolUpdate">
      <Navbar type="notHomePage" />
      <div className="container">
        {isLoading ? (
          "please wait"
        ) : (
          <form
            className="listSchool2"
            onSubmit={(e) => handleSubmit(e, apiData._id)}
          >
            <h1 style={{ color: "green", textAlign: "center" }}>
              UPDATE {apiData.name}
            </h1>
            <label>School Name</label>
            <input
              type="text"
              defaultValue={apiData.name}
              name="name"
              onChange={handleChange}
            />
            <label>School Address</label>
            <input
              type="text"
              defaultValue={apiData.address}
              name="address"
              onChange={handleChange}
            />
            <label>School Phone Number</label>
            <input
              type="number"
              defaultValue={apiData.phone}
              name="phone"
              onChange={handleChange}
            />
            <label>Short But Consice description for school</label>
            <textarea
              name="desc"
              cols="30"
              rows="10"
              defaultValue={apiData.desc}
              maxLength="300"
              onChange={handleChange}
            ></textarea>
            <label>State School is Located</label>
            <select onChange={handleChange} name="state">
              <option value={apiData.state}>
                want to Change the State from {apiData.state}?
              </option>
              <option value="Abuja">Abuja</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="AkwaIbom">AkawIbom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Kastina">Kastina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Zamfara">Yobe</option>
            </select>
            <label>Local Government Area</label>
            <select onChange={handleChange} name="lga">
              {credentials.state !== undefined ? (
                lgaList.map((lga) => (
                  <option value={lga} key={lga}>
                    {lga}
                  </option>
                ))
              ) : (
                <option value={apiData.lga}>{apiData.lga}</option>
              )}
            </select>
            <label>Select School Category</label>
            <select onChange={handleChange} name="category">
              <option value={apiData.category}>
                Want To Change Category from {apiData.category}?
              </option>
              <option value="primary school">Primary School</option>
              <option value="secondary school">Secondary School</option>
              <option value="Nursery school">Nursery School</option>
              <option value="daycare school">Daycare</option>
            </select>
            <label>Enter City School is Located</label>
            <input
              type="text"
              defaultValue={apiData.city}
              name="city"
              onChange={handleChange}
            />
            <label>Google Profile Rating</label>
            <input
              type="text"
              defaultValue={apiData.googleRating}
              name="googleRating"
              onChange={handleChange}
            />
            <label>Enter School Email</label>
            <input
              type="email"
              defaultValue={apiData.email}
              name="email"
              onChange={handleChange}
            />
            <label>Link To School Website</label>
            <input
              type="text"
              defaultValue={apiData.website}
              name="website"
              onChange={handleChange}
            />
            <label>Fee Range</label>
            <select onChange={handleChange} name="feeRange">
              <option value={apiData.feeRange}>
                fee range: {apiData.feeRange}
              </option>
              <option value="10k to 30k">10k to 30k per session</option>
              <option value="30k to 50k">30k to 50k per session</option>
              <option value="50k to 100k">50k to 100k per session</option>
              <option value="100k to 200k">100k to 200k per session</option>
              <option value="200k to 500k">200k to 500k per session</option>
            </select>
            <label>Google Profile Link</label>
            <input
              type="text"
              defaultValue={apiData.googleProfile}
              name="googleProfile"
              onChange={handleChange}
            />
            <button>Update</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SchoolUpdate;
