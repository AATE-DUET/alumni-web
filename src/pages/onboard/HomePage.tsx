import { Carousel, Collapse, Image, Typography } from "antd";
import { Link } from "react-router-dom";

import AppFooter from "../../pages/committee/components/AppFooter"

//https://mevrik-cloud.mevrik.com/apps_342/TYEE-342_XZH_aated-logo.png
//https://www.bproperty.com/blog/wp-content/uploads/2021/07/vrr.png

const HomePage = () => {
  return (
    <div className="flex flex-col gap-5 mt-4">
      <Carousel accessibility autoplay autoplaySpeed={1500}>
        <Image
          preview={false}
          height={420}
          width={"100%"}
          src="https://icsed.duet.ac.bd/images/icsedslider-1.jfif"
        />
        <Image
          preview={false}
          height={420}
          width={"100%"}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Dhaka_University_of_Engineering_Technology.jpg/800px-Dhaka_University_of_Engineering_Technology.jpg"
        />
        <Image
          preview={false}
          height={420}
          width={"100%"}
          src="https://www.duet.ac.bd/storage/slider/2024-11-24-1732457809-697.jpg"
        />
      </Carousel>
      <div className="grid grid-cols-12 gap-3 text-white">
        <div className="col-span-12 lg:col-span-4 h-85 bg-red-500 p-3">
          <h1>About Us</h1>
          <p>The DUET Textile Engineering Alumni Association was formed to build a bridge between our graduates and the university, offering a platform for networking, mentorship, and knowledge sharing. Our association is dedicated to fostering an ongoing relationship between the department and its alumni, encouraging a sense of community and collaboration. We believe in creating opportunities for alumni to engage with current students, sharing experiences, advice, and career insights that can shape the next generation of textile engineers. The association organizes various events such as seminars, workshops, and reunions, aiming to keep our members connected and up-to-date on the latest developments in the textile industry.  
          <Link
            to="/about-us"
            className="text-black  transition-colors mt-2"
          > 
              See more ...
          </Link>
          </p>
          
        </div>
        <div className="col-span-12 lg:col-span-4 h-85 bg-green-500 p-3">
          <h1>Our History</h1>
          <p>The Department of Textile Engineering at Dhaka University of Engineering and Technology (DUET) was established in 2005, with a vision to create highly skilled professionals capable of addressing the dynamic needs of the textile industry. Over the years, the department has built a strong academic foundation, offering comprehensive programs that blend theoretical knowledge with practical application. Our alumni have become leaders in various sectors of the textile industry, both nationally and internationally, contributing significantly to technological advancements. The establishment of the Alumni Association Portal marks a significant milestone in fostering stronger connections between the department and its graduates. Through this platform, we aim to strengthen the ties within the DUET Textile Engineering community, celebrating past achievements while paving the way for future collaboration and growth.</p>
          
        </div>
        <div className="col-span-12 lg:col-span-4 h-85 bg-blue-500 p-3">
          <h1>Our Mission</h1>
          <p>
          The mission of the DUET Textile Engineering Alumni Association is to create a strong, supportive network of alumni that fosters professional development and strengthens the bond between the university and its graduates. We aim to provide a platform for alumni to connect, collaborate, and contribute to the growth of the textile industry both locally and globally. Our goal is to facilitate continuous learning, career opportunities, and mentorship for both alumni and current students. Through active engagement and contributions, we seek to maintain the legacy of excellence established by the department. Ultimately, we aspire to build an alumni community that drives innovation, supports professional growth, and gives back to the next generation of textile engineers.
          </p>
        </div>
      </div>
      <div>
        <div className="text-center">
          <Typography.Title level={4} className="text-center">
            Frequently Asked Question
          </Typography.Title>
          <Typography.Text type="secondary" className="text-center">
            Your Queries Answered: Navigating Your Alumni Experience
          </Typography.Text>
        </div>
        <Collapse
          items={[
            {
              label: "Q.How do I Apply for membership?",
              children:
                "Kindly contact with the Alumni Organizing Secretary or any other executive committee members.",
            },
            {
              label: "Q.How can I update my contact information?",
              children:
                "After login you will get all of your contact information updating form.",
            },
            {
              label: "Q.What events are coming up, and how can I participate?",
              children:
                "Stay in the loop by visiting the 'Events' page on the website. You'll find a calendar showcasing upcoming events. Click on the event you're interested in to get more details and information on how to participate.",
            },
            {
              label:
                "Q.How can I contribute to the Alumni Association?",
              children:
                "Making a difference is just a moment away. Just contact AATED office to learn more about the program and find details on how to contribute. Your support can help shape the educational journey of aspiring scholars.",
            },
          ]}
        />
      </div>
      <AppFooter />
    </div>
  );
};

export default HomePage;
