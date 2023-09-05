const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors')

const app = express();

app.use(cors());
const url="https://www.imdb.com/list/ls525104812/?ref_=hm_edcft_geo_1_i";
const url2="https://www.naukri.com/women-jobs?k=women";
function getHandle(linkedinProfileUrl) {
    const url = getLinkedinProfileUrl(linkedinProfileUrl);
    return url?.split("/in/")?.[1];
  }
  
  function getLinkedinProfileUrl(navigationUrl) {
    return navigationUrl?.split("?")?.[0];
  }

  async function searchLinkedIn(query) {
    try {
        const start=page*10;
        const res= await

        fetch(`https://www.linkedin.com/voyager/api/graphql?variables=(start:20,origin:SWITCH_SEARCH_VERTICAL,query:(keywords: ${encodeURI(search)},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:resultType,value:List(PEOPLE)),(key:searchId,value:List(9ddd31e8-189c-48b1-88c1-0dcfaedba31b))),includeFiltersInResponse:false))&&queryId=voyagerSearchDashClusters.a789a8e572711844816fa31872de1e2f`, {
            headers: {
              accept: "application/vnd.linkedin.normalized+json+2.1",
              "accept-language": "en-US,en;q=0.9",
              "csrf-token": "ajax:7685046803791350453",
              "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-li-lang": "en_US",
              "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_people_load_more;0VtXz5XXSRS2fuIAw8aIPA==",
              "x-li-track": "{\"clientVersion\":\"1.12.9578\",\"mpVersion\":\"1.12.9578\",\"osName\":\"web\",\"timezoneOffset\":5.5,\"timezone\":\"Asia/Calcutta\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1,\"displayWidth\":1920,\"displayHeight\":1080}",
              "x-restli-protocol-version": "2.0.0",
              "cookie": "bcookie=\"v=2&d78ddb84-db1c-49d2-8ebf-1c06ad6ef9da\"; li_sugr=f3ad73a2-48c8-4475-9725-1ae8d1461f48; bscookie=\"v=1&20210403133423cc5c24e2-cf3e-4c11-828e-778b8087b148AQEh0IQHwFacRGHIZ7FCxli1aE8CYACV\"; li_rm=AQEoRSXDBKFhoQAAAYKq6f_QLsb5wFCjX92d8wjoIsYG0VZ5oSnA_dIpeCYXYImP77P2Tw_sR4Zu1iR9LPK8PT4egh-Rzk6lwN7TEiWmqx6gH6JzBLO8uEUb; liap=true; JSESSIONID=\"ajax:7685046803791350453\"; li_theme=light; li_theme_set=app; mbox=session#3cb2d3628edb4dada771ddb4e376a256#1677579342|PC#3cb2d3628edb4dada771ddb4e376a256.31_0#1693129482; gpv_pn=business.linkedin.com%2Fen-in%2Ftalent-solutions%2Fpost-jobs%2Fjobs-features; s_tslv=1677577485818; s_ips=1038; s_tp=4993; timezone=Asia/Calcutta; _guid=e49cbe2c-74fb-4dd6-934b-d03fa0a12b55; aam_uuid=63302853993572141810224944185748971649; li_at=AQEDATJw9qEFgij9AAABhD9HYYoAAAGJkV0MwU0AYoI1Kqq8zWSHCmg26OqdnB0PM5AdixNgoUG8mfXhgrSOt7lX8BKoNjallyU4UkbTLaGLzvcokVNNO1ylF7Bw_e9j9zYu_WfE2s1HJRMxwl18abgw; AnalyticsSyncHistory=AQL-mBuVPriOxAAAAYmED8pLuyPQK-j_EAvjNsTkuu9a3694COUONG7FGIS6LiZoJ2n-yCLAgH7iHN0Rkh50PQ; lms_ads=AQGJC9aFPRke1wAAAYmED812rSxwFvAuY4hsMd_FJ0xl-5JK9B3RpyWK4vwfHSHxLTJl3TeLN6UMyefL_7kEQx1kCNdDp9AQ; lms_analytics=AQGJC9aFPRke1wAAAYmED812rSxwFvAuY4hsMd_FJ0xl-5JK9B3RpyWK4vwfHSHxLTJl3TeLN6UMyefL_7kEQx1kCNdDp9AQ; lang=v=2&lang=en-us; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19563%7CMCMID%7C62753770800407997900274726961143190346%7CMCAAMLH-1690784944%7C12%7CMCAAMB-1690784944%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1690187344s%7CNONE%7CMCCIDH%7C1718792499%7CvVersion%7C5.1.1; UserMatchHistory=AQKVsQkoXdH9aAAAAYmG3hH8Sdm908aUkg_URoguRloz_8paA3v07F0TiUwImPwXCGEVXBXgvEluvHXNt3lpBFUaLWHtKjFB1xTpV6L3qdbo5_vFkCVWuRVP-rZgM_9PvHGyjHTMAtP9pGBCBTBKemTOk2tk3490zKkbxKbHbgk3AtXJfjK_iVqbCWiBP5et_LiTJlc7QKP611Fx5XoLpnWCOgvV0Z-VDUHEwMPWeDsFxgzYGmz53E3FuWNpyUNzAoBkdADC6yJORHzMrbkPjh7xh-8KI7eS-laxq9FYI4BLQqi68EXLz2TvpZcWIuoOHvK5AHHmm1GRYDgehXtgcvQIif74bxQ; lidc=\"b=VB69:s=V:r=V:a=V:p=V:g=4067:u=512:x=1:i=1690184851:t=1690257347:v=2:sig=AQGTzElv-9PEDCve9uYRdSD98ghlwd0_\"",
              "Referer": "https://www.linkedin.com/search/results/people/?keywords=software%20engineer&origin=SWITCH_SEARCH_VERTICAL&page=2&searchId=9ddd31e8-189c-48b1-88c1-0dcfaedba31b&sid=b96",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          });
      const search = await searchPeople(query);
      const peoplesProfiles = search?.included?.filter(
        (s) => s?.template === "UNIVERSAL"
      );
      const jsonify = peoplesProfiles.map((p) => {
        return {
          name: p?.title?.text,
          handle: getHandle(p?.navigationUrl),
          jobTitle: p?.primarySubtitle?.text,
          summary: p?.summary?.text,
          location: p?.secondarySubtitle?.text,
          image:
            p?.image?.attributes?.[0]?.detailData?.nonEntityProfilePicture
              ?.vectorImage?.artifacts?.[0]?.fileIdentifyingUrlPathSegment,
          url: getLinkedinProfileUrl(p?.navigationUrl),
        };
      });
      return jsonify;
    } catch (error) {
      console.log("error at search: ", error.message);
    }
  }


app.get('/women-jobs', async (req, res) => {
  try {
    const response = await axios.get(url2);
    const html = response.data;
    const $ = cheerio.load(html);
    
    const jobs = [];
    // console.log($);
    const job_data=$('.nI-gNb-header__wrapper');
    job_data.each((index, element) => {
      const jobTitle = $(element).find('a').attr(href).text();
    //   const company = $(element).find('.jobTuple-company').text().trim();
    //   const location = $(element).find('.jobTuple-location').text().trim();
    //   const experience = $(element).find('.jobTuple-exp').text().trim();
    //   const skills = $(element).find('.tagTuple-cont').text().trim();

    // //   jobs.push({ jobTitle, company, location, experience, skills });
    jobs.push({ jobTitle });

 

}
);
console.log(job_data.html());

    res.send(jobs);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});



app.get('/movies', async (req, res) => {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      
      const jobs = [];
      // console.log($);
      const job_data=$('.lister-item-content');
      job_data.each((index, element) => {
        const jobTitle = $(element).find('h3 > a').text().trim();
        const company = $(element).find('.h3 > .lister-item-year').text().trim();
        // const location = $(element).find('.jobTuple-location').text().trim();
        // const experience = $(element).find('.jobTuple-exp').text().trim();
        // const skills = $(element).find('.tagTuple-cont').text().trim();
  
      // //   jobs.push({ jobTitle, company, location, experience, skills });
      jobs.push({ jobTitle, company});
  
  }
  );
  console.log(jobs);

  
      res.send(jobs);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });


app.get("/api", (req, res)=>{
    
        res.send({"users":["userOne","userTwo","userThree"]})
        
    })
app.listen(5000,()=>{
    console.log('server is up on port 5000')
})
