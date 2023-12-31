import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faEdit,
  faQuestion,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../App";

const Dashboard = () => {
  let lgaList;
  const { user } = useContext(AuthContext);
  // console.log(user._id)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const [showTip, setShowTip] = useState(false);

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

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      lgaList = ["Select A State to see your LGAs*"];
      break;
  }

  //const [resData, setResData] = useState({});
  const [resError, setResError] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    //console.log(credentials)

    const formData = new FormData();

    // Add the text input values to the FormData
    for (const key in credentials) {
      formData.append(key, credentials[key]);
    }

    // Add multiple images to the FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await axios.post(`${URL}/schools/${user._id}`, formData);
      console.log(res.data);
      setResError("");
      alert(
        "School created and awaiting approval. An Email has been sent to you!"
      );
      window.location.reload(); // this plain javascript. It seems to be causing problems in production
      // navigate("/dashboard");
    } catch (err) {
      const error = err.response.data;
      const errorMsg = error.message;
      setResError(errorMsg);
      console.log(resError);
    } finally {
      setIsSubmitting(false); // Reset the state after submission is complete
    }
  };

  //   get all schools listed by user
  const { apiData, isLoading, error } = useFetch(
    `${URL}/schools/my-schools/${user._id}`
  );

  // delete school
  const handleDelete = async (schoolId) => {
    // console.log(schoolId);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this school?"
    );

    if (shouldDelete) {
      // Call delete function when confirmed
      try {
        const res = await axios.delete(
          `${URL}/schools/${schoolId}/${user._id}`
        );
        console.log(res.data);
        window.location.reload(); // this plain javascript
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  // navigate to edit page
  const handleEdit = (schoolId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to edit this school?"
    );

    if (shouldDelete) {
      // Call your delete function when confirmed
      navigate("/update-school", { state: schoolId });
    }
  };

  useEffect(() => {
    document.title = `Naija School Search - ${user.username}'s Dashboard`;
  }, [user.username]);

  return (
    <div className="dashboard">
      <Navbar type="notHomePage" />
      <div className="dashboardFull container">
        {error ? (
          <span>{error.message}</span>
        ) : (
          <div className="dashboard_left">
            {isLoading
              ? "loading please wait"
              : apiData &&
                apiData.map((school) => (
                  <div className="listedSchool flex" key={school._id}>
                    <div className="school_details">
                      <p>
                        <span>School Name:</span> {school.name}
                      </p>
                      <p>
                        <span>School Email:</span> {school.email}
                      </p>
                      <p>
                        <span>School Category:</span> {school.category}
                      </p>
                      <p>
                        <span>NSS Status:</span>{" "}
                        {school.approved
                          ? "approved(Your School is now public)"
                          : "not Approved(Only you can see this School"}
                      </p>
                    </div>
                    {school.googleRating === "undefined" ? (
                      <div className="googleRating">N/A</div>
                    ) : (
                      <div className="googleRating">{school.googleRating}</div>
                    )}
                    <div className="actionButtons">
                      <button onClick={() => handleEdit(school._id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <Link to={`/school/${school._id}`}>
                        <button id="details">
                          <FontAwesomeIcon icon={faBookOpen} />
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(school._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        )}

        <div className="dashboard_right">
          <div className="user_details">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>
              If for example you have a Nusersy, primary and a secondary school,
              please list them seperately under the correct category.
            </p>
            <p style={{ color: "red" }}>Fields marked (*) are compulsory</p>
          </div>
          <form
            className="listSchool"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Name of School*"
              name="name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Full Address Of School(include state and lga)*"
              name="address"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              placeholder="Enter Phone number*"
              name="phone"
              onChange={handleChange}
              required
            />
            <textarea
              name="desc"
              cols="30"
              rows="10"
              placeholder="Tell us briefly about your school, admission requirements, school clubs, outdoor activities, school bus availability etc.*"
              maxLength="3000"
              required
              onChange={handleChange}
            ></textarea>
            <select onChange={handleChange} name="state">
              <option value="">Enter Your State*</option>
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

            <select onChange={handleChange} name="lga">
              {lgaList.map((lga) => (
                <option value={lga} key={lga}>
                  {lga}
                </option>
              ))}
            </select>

            <select onChange={handleChange} name="category">
              <option value="">Pick a category*</option>
              <option value="primary school">Primary School</option>
              <option value="secondary school">Secondary School</option>
              <option value="Nursery school">Nursery School</option>
              <option value="daycare school">Daycare</option>
              <option value="Tailoring school">Tailoring School</option>
              <option value="Hairstyling">Hair Styling School</option>
              <option value="Software Development and IT school">
                Software Development and IT School
              </option>
              <option value="Catering school">Catering School</option>
              <option value="Carpentry school">Carpentry School</option>
              <option value="Interior Decoration school">
                Interior Decoration School
              </option>
              <option value="Arts and Printing school">
                Arts and Printing School
              </option>
            </select>
            <input
              type="text"
              placeholder="Enter City*"
              name="city"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Enter School's Google Rating If you have"
              name="googleRating"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Please Enter a valid Email Address of your school*"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Full Link to school website(https://myschool.com)"
              name="website"
              onChange={handleChange}
            />
            <select onChange={handleChange} name="feeRange">
              <option value="">Fee range per session*</option>
              <option value="#10,000 to #30,000 per session">
                #10,000 to #30,000 per session
              </option>
              <option value="#30,000 to #50,000 session">
                #30,000 to #50,000 session
              </option>
              <option value="#50,000 to #100,000 per session">
                #50,000 to #100,000 per session
              </option>
              <option value="#100,000 to #200,000 per session">
                #100,000 to #200,000 per session
              </option>
              <option value="#200,000 to #500,000 per session">
                #200,000 to #500,000 per session
              </option>
              <option value="#500,000 or more per session">
                #500,000 or more per session
              </option>
            </select>
            <input
              type="text"
              placeholder="google business profile link if you have one"
              name="googleProfile"
              onChange={handleChange}
            />
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <h3>upload six(6) quality images of your school*</h3>
              <FontAwesomeIcon
                icon={faQuestion}
                style={{
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "8px",
                  cursor: "pointer",
                }}
                onClick={() => setShowTip(!showTip)}
              />
            </div>
            {showTip && (
              <p>
                on a computer hold down control key to enable you select more
                than one image
              </p>
            )}
            <input type="file" multiple onChange={handleFileChange} />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Apply"}
            </button>
          </form>
          {resError && <div className="errorDiv">{resError}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
