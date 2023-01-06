import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import { sendForm } from "emailjs-com";
import { Link } from "react-router-dom";

const successAlert = (mensaje) => {
	toast.success(mensaje, {
		position: "bottom-left",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Slide,
	});
};

const errorAlert = (mensaje) => {
	toast.error(mensaje, {
		position: "bottom-left",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Slide,
	});
};

const Contacto = () => {
	const handleSendEmail = (e) => {
		e.preventDefault();

		sendForm(
			"service_m8v520s",
			"template_x0ylqxq",
			e.target,
			"cZpqg9KNPa_FLrmhS"
		)
			.then((response) => {
				successAlert("El correo se ha enviado exitosamente");
				e.target.reset();
			})
			.catch((error) => {
				errorAlert("El correo no se pudo enviar, intente en otro momento");
			});
	};

	return (
		<>
			<div className="contact-form-container">
				<div className="inicio-filtros contact-filtros">
					<p>
						<Link to="/">Inicio</Link>
						{" > "}
						<Link to="/contact">Contacto</Link>
					</p>
				</div>
				<h2 className="contact-form-title">Formulario de contacto</h2>
				<form onSubmit={handleSendEmail} className="contact-form">
					<input
						type="text"
						id="nombre"
						name="nombre"
						className="contact-form-item contact-form-nombre"
						placeholder="Nombre"
					/>
					<input
						type="email"
						id="email"
						name="email"
						className="contact-form-item contact-form-email"
						placeholder="Email"
					/>
					<input
						type="text"
						id="asunto"
						name="asunto"
						className="contact-form-item contact-form-asunto"
						placeholder="Asunto"
					/>
					<textarea
						cols="100"
						rows="20"
						id="mensaje"
						className="contact-form-textarea"
						name="mensaje"
						placeholder="Mensaje"
					/>
					<div className="contact-form-btn-container">
						<button onSubmit={handleSendEmail} className="contact-form-btn">
							Enviar correo
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</>
	);
};

export default Contacto;
