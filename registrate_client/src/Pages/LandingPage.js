import RegisterForm from "../Components/RegisterForm";

export default function LandingPage() {
    return(
        <div id="landing-page" className="page" >
            <h1 className="mx-3" id="landing-title">Register for your event here!</h1>
            
            <RegisterForm ></RegisterForm>
        </div>
    )
}