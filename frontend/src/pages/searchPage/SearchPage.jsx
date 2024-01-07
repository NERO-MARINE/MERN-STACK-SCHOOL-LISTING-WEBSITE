// import { useLocation, useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./searchPage.css";
import Footer from "../../components/footer/Footer";
import useFetch from "../../useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRemove } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
// install this to use react spinner: npm install react-loader-spinner
import { TailSpin } from "react-loader-spinner";
import { URL } from "../../App";

const SearchPage = () => {
  //const location = useLocation()
  // console.log(location);
  // const [state, setState] = useState(location.state.nigerianState)
  // const [lga, setLga] = useState(location.state.nigerianLga)
  // const [category, setCategory] = useState(location.state.category)
  const [submittingItemId, setSubmittingItemId] = useState(null);

  const { user } = useContext(AuthContext);
  // const userId = user._id;
  const userId = user ? user._id : null;

  const { apiData: data, refetch } = useFetch(
    `${URL}/schools/getFavorites/${userId}`
  );

  // console.log(data); // this gives us the favorite schools of the user

  let lgaList;
  const { nigerianState, nigerianLga, category } = useContext(SearchContext);
  const [state, setState] = useState(nigerianState);
  const [lga, setLga] = useState(nigerianLga);
  const [newCategory, setNewCategory] = useState(category);

  const { apiData, isLoading, error } = useFetch(
    `${URL}/schools/search/?featured=true&featured=false&approved=true&state=${state}&lga=${lga}&category=${newCategory}`
  );

  switch (state) {
    case "Abia":
      lgaList = [
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

  const navigate = useNavigate();
  // save school to favorite school
  const handleAddToFav = async (schoolId) => {
    if (user) {
      try {
        setSubmittingItemId(schoolId);

        await axios.post(
          `${URL}/schools/addSchoolToFavorite/${schoolId}/${userId}`
        );
        // console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setSubmittingItemId(null);
      }

      refetch();
    }

    if (!user) {
      navigate("/login");
    }
  };

  // delete school from favorite school
  const handleDeleteFromFav = async (schoolId) => {
    if (user) {
      try {
        setSubmittingItemId(schoolId);
        await axios.post(
          `${URL}/schools/removeFavoriteSchool/${schoolId}/${userId}`
        );
        // console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setSubmittingItemId(null);
      }

      refetch();
    }

    if (!user) {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = "Naija School Search - Search Results";
  }, []);

  return (
    <div className="searchPage">
      <Navbar type="notHomePage" />
      <div className="searchResults container">
        <div className="searchResultsLeft flex">
          <h2>Search</h2>
          <select onChange={(e) => setState(e.target.value)}>
            <option value={state}>
              {state === "" ? "pick a state" : state}
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

          <select onChange={(e) => setLga(e.target.value)}>
            {state === "" && <option>pick a state to see Lga</option>}

            {state !== "" && <option value={lga}>{lga}</option>}

            {lgaList.map((lga) => (
              <option value={lga} key={lga}>
                {lga}
              </option>
            ))}
          </select>

          <select onChange={(e) => setNewCategory(e.target.value)}>
            <option value={category}>
              {category === "" ? "pick a category" : category}
            </option>
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
          <button className="button searchBtn">Search</button>
        </div>

        {error ? (
          <span>{error.message}</span>
        ) : (
          <div className="searchResultsRight">
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <TailSpin color="green" height={80} width={80} />
                {/* <p style={{ marginLeft: "10px" }}>Loading, please wait...</p> */}
              </div>
            ) : (
              apiData &&
              apiData.map((searchResult) => (
                <div className="schoolShowCase" key={searchResult._id}>
                  <div className="photo flex">
                    <div className="label">Premises:</div>
                    <img
                      width="100%"
                      height="120px"
                      style={{ objectFit: "cover" }}
                      // src={`${URL}/uploads/` + searchResult.images[0]}
                      src={
                        `https://res.cloudinary.com/dixtyyrsn/image/upload/` +
                        searchResult.images[0]
                      }
                      alt={searchResult.name}
                    />
                  </div>
                  <div className="schoolName flex">
                    <div className="label">School Name</div>
                    <div className="name">{searchResult.name}</div>
                    {searchResult.googleProfile === "undefined" ? (
                      <button className="button rating">
                        Google Rating N/A
                      </button>
                    ) : (
                      <button className="button rating">
                        {searchResult.googleRating} Google Rating
                      </button>
                    )}
                  </div>
                  <div className="schoolName flex">
                    <div className="label">City/Town/community</div>
                    <div className="name">{searchResult.city}</div>
                    {data.includes(searchResult._id) ? (
                      <button
                        className="removeFav"
                        onClick={() => handleDeleteFromFav(searchResult._id)}
                        disabled={submittingItemId === searchResult._id}
                      >
                        <FontAwesomeIcon icon={faRemove} />{" "}
                        {submittingItemId === searchResult._id
                          ? "removing, wait!"
                          : "Remove Favorite"}
                      </button>
                    ) : (
                      <button
                        className="addFav"
                        onClick={() => handleAddToFav(searchResult._id)}
                        disabled={submittingItemId === searchResult._id}
                      >
                        <FontAwesomeIcon icon={faHeart} />{" "}
                        {submittingItemId === searchResult._id
                          ? "Adding, wait"
                          : "Add to Favorite"}
                      </button>
                    )}
                  </div>
                  <div className="feeRange flex">
                    <div className="label">Fee Range</div>
                    <div className="fee">
                      {searchResult.feeRange} per session
                    </div>
                    <Link to={`/school/${searchResult._id}`}>
                      <button className="button detailsBtn">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
