import Navigation from "./Navigation";

const Privacy = () => {
    return(
        <div className="mt-5 container">
            <Navigation active='privacy'/>

            <h1 className="mt-5">Privacy Policy for Movie Website</h1>

            <p className="fs-5">This Privacy Policy document contains types of information that is collected and recorded by Movie Website and how we use it.</p>

            <p className="fs-5">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact <a href="#" className="text-decoration-none">ren.jie1@northeastern.edu</a>.</p>

            <p className="fs-5">This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Movie Website. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info">Free Privacy Policy Generator</a>.</p>

            <h2 className="mt-5">Consent</h2>

            <p className="fs-5">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h2 className="mt-5">Information we collect</h2>

            <p className="fs-5">You can use most functionalities of Movie Website without registering or logging in. You only need to register or login when you want to write a review, add a movie to your list, or follow other users.</p>
            <p className="fs-5">When you register for an Account, we may ask for your contact information, including items such as name, email address, and telephone number.</p>
            <p className="fs-5">You may also choose to provide additional information about yourself (e.g. location, date of birth) to help us analyze and build our site to better serve you. Even if you refuse to provide this additional information, you can still use all the features of our website.</p>

            <h2 className="mt-5">How we use your information</h2>

            <p className="fs-5">We use the information we collect in various ways, including to:</p>

            <ul>
                <li className="fs-5">Build, improve, and maintain our website</li>
                <li className="fs-5">Understand and analyze how you use our website</li>
                <li className="fs-5">Analyze your preferences, and recommend movies you might like or users who has the same preferences as you</li>
                <li className="fs-5">Develop new products, services, features, and functionality</li>
                <li className="fs-5">Send you emails to provide you with updates and activities of our website</li>
                <li className="fs-5">Find and prevent fraud</li>
            </ul>

            <h2 className="mt-5">Cookies and Web Beacons</h2>

            <p className="fs-5">Like any other website, Movie Website uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

            <p className="fs-5">For more general information on cookies, please read <a href="https://www.generateprivacypolicy.com/#cookies">the Cookies article on Generate Privacy Policy website</a>.</p>



            <h2 className="mt-5">Advertising And Third Party Privacy Policies</h2>

            <p className="fs-5">We promise not to disclose any information about you to any third party organization</p>

            <p className="fs-5">We promise not to disclose any information about you to advertisers and not to refer you to any advertisements</p>
        </div>
    )
}
export default Privacy;