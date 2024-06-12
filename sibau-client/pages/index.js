import Head from "next/head";
import { Inter } from "next/font/google";
import {
  News,
  About,
  Mission,
  History,
  Admission,
  GraduateProgram,
  Department,
  NavigationBar,
  Footer,
  SportsActivities,
  Apply,
  Tution,
  Scholarship,
  TabSlide,
} from "../components/home/Index";
import CampusInfo from "@/components/home/CampusInfo";
import Sponsors from "@/components/home/Sponser";
import { getValueByKey } from "@/apis";
import HeaderFooter from "@/components/global/HeaderFooter";
import Events from "@/components/home/Events";
import { ABOUT_BANNER, HOME_STATISTIC } from "@/utils/constants";
import MainLayout from "@/components/layouts/MainLayout";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
  admissionParas,
  historyData,
  sportsData,
  overview,
  tuitionData,
  programsData,
  admissionData,
}) {
  return (
    <>
      <Head>
        <title>SIBAU | Khalil</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <TabSlide />
        <About />
        <Mission data={overview} />
        <History data={historyData} />
        <CampusInfo />

        <GraduateProgram data={programsData} />

        <Department />
        <Admission data={admissionData} />
        <Apply />
        <Scholarship />

        {/* How to do it? */}
        <Tution data={tuitionData} />

        <SportsActivities data={sportsData} />
        <News />
        {/* <Events /> */}

        <Sponsors />
      </>
    </>
  );
}

export async function getServerSideProps() {
  let sportsData = {};
  let historyData = {};
  let admissionParas = {};
  let overview = {};
  let tuitionData = {};
  let programsData = {};
  let admissionData = {};
  try {
    const [sportsResult, historyResult, admissionParasResult, overviewResult] =
      await Promise.all([
        getValueByKey("HOME_SPORTS"),
        getValueByKey(HOME_STATISTIC),
        getValueByKey("admission-overview-paras"),
        getValueByKey("home-overview"),
      ]);
    const admissionResult = await getValueByKey("HOME_ADMISSION_DATA");

    const tuitionResult = await getValueByKey("HOME_TUITION_FEE");
    const programsResult = await getValueByKey("HOME_PROGRAMS_PARA");

    historyData = JSON.parse(historyResult.value);
    overview = JSON.parse(overviewResult.value);
    admissionParas = JSON.parse(admissionParasResult.value);
    sportsData = JSON.parse(sportsResult.value);
    tuitionData = JSON.parse(tuitionResult.value);
    programsData = JSON.parse(programsResult.value);
    admissionData = JSON.parse(admissionResult.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return {
    props: {
      admissionParas,
      historyData,
      sportsData,
      overview,
      tuitionData,
      programsData,
      admissionData,
    },
  };
}
