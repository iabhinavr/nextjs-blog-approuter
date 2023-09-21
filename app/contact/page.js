import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ContactForm from "../../components/ContactForm";

export const metadata = {
    title: 'Contact Us',
    description: 'Contact us to enquire more...',
}

export default function Contact() {

    return (
        <>
            <section className="bg-slate-700">
                <SiteHeader className="header-contact" />
            </section>
            <ContactForm />
            <SiteFooter />
        </>
    );
}