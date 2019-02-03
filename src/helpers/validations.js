export function validateCPF(strCPF) {
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF === "00000000000")
		return false;

	for (var i = 1; i <= 9; i++) {
		Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
	}
	Resto = (Soma * 10) % 11;

	if ((Resto === 10) || (Resto === 11)) {
		Resto = 0;
	}
	if (Resto !== parseInt(strCPF.substring(9, 10), 10))
		return false;

	Soma = 0;
	for (i = 1; i <= 10; i++) {
		Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
	}
	Resto = (Soma * 10) % 11;

	if ((Resto === 10) || (Resto === 11))
		Resto = 0;
	if (Resto !== parseInt(strCPF.substring(10, 11), 10))
		return false;

	return true;
}

export function validateCEP(strCEP) {
	if (strCEP.length < 8) {
		return false;
	} else {
		return true;
	}
}

export function validateMainPhone(strPhone) {
	if (strPhone.length < 11) {
		return false;
	} else {
		return true;
	}
}

export const masks = {
	cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
	cellphone: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
	phone: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
	cep: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
	cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
};

export const validateUser = (user) => {

	if (!validateCPF(user.cpf.replace(/\D+/g, ''))) {
		return {
			invalid: true,
			message: 'CPF inválido!',
		}
	}

	if (!validateCEP(user.cep.replace(/\D+/g, ''))) {
		return {
			invalid: true,
			message: 'CEP inválido',
		}
	}

	if (!validateMainPhone(user.telefoneCel.replace(/\D+/g, ''))) {
		return {
			invalid: true,
			message: 'Telefone principal inválido',
		}
	}

	if (user.senha !== user.senhaConf) {
		return {
			invalid: true,
			message: 'A senha de confirmação não coincide!',
		}
	}

	return {
		invalid: false,
		message: 'Sucess',
	};
}
