import "./styles.css";

import logo from "assets/Img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebook,
	faInstagram,
	faWhatsapp,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer className="pie-pagina" id="footer">
			<div className="grupo-1">
				<div className="box imagen">
					<a href="#">
						<img src={logo} alt="Logo Icandy" />
					</a>
				</div>
				<div className="box">
					<h2>Sobre nosotros</h2>
					<p>
						Somos una tienda dedicada a la venta de todo tipo de dulces y
						estamos empezando a incursionar en el mundo del e-commerce para
						llegar a más gente.
					</p>
					<p>
						Si llegas a encontrar alguna falla con la página o tienes alguna
						duda...
					</p>
					<br />
					<Link
						onClick={() => window.scrollTo(0, 0)}
						className="link-to-contact-form"
						to="/contact"
					>
						¡Contactanos!
					</Link>
				</div>
				<div className="box">
					<h2>SIGUENOS</h2>
					<div className="red-social">
						<a href="#">
							<FontAwesomeIcon icon={faWhatsapp} />
						</a>
						<a href="#">
							<FontAwesomeIcon icon={faFacebook} />
						</a>
						<a href="#">
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a href="#">
							<FontAwesomeIcon icon={faTwitter} />
						</a>
					</div>
				</div>
			</div>
			<div className="grupo-2">
				<small>
					&copy; 2022 <b>Icandy</b> -Todos los Derechos Reservados.
				</small>
			</div>
		</footer>
	);
};

export default Footer;
