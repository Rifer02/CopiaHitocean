document.addEventListener('DOMContentLoaded', function() {
  
  const formulario = document.getElementById('formularioContacto');
  const API_URL = 'http://localhost:3000/api/contacto';
  
  // Scroll al formulario
  document.querySelector('.btn-hablemos')?.addEventListener('click', function() {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  });
  
  document.getElementById('btnContactoNav')?.addEventListener('click', function() {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  });

  // Validar campo
  function validarCampo(campo) {
    const formGroup = campo.parentElement;
    let errorMsg = formGroup.querySelector('.error-message');
    
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'error-message';
      formGroup.appendChild(errorMsg);
    }

    formGroup.classList.remove('error');
    errorMsg.textContent = '';

    if (campo.hasAttribute('required') && !campo.value.trim()) {
      formGroup.classList.add('error');
      errorMsg.textContent = 'Campo obligatorio';
      return false;
    }

    if (campo.type === 'email' && campo.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(campo.value)) {
        formGroup.classList.add('error');
        errorMsg.textContent = 'Email inválido';
        return false;
      }
    }

    return true;
  }

  // Enviar formulario
  formulario.addEventListener('submit', async function(e) {
    e.preventDefault();

    const inputs = formulario.querySelectorAll('input, textarea, select');
    let valido = true;

    inputs.forEach(input => {
      if (!validarCampo(input)) valido = false;
    });

    if (!valido) return;

    const btnSubmit = formulario.querySelector('.btn-submit');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    const formData = {
      nombre: document.getElementById('nombre').value.trim(),
      empresa: document.getElementById('empresa').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      idea: document.getElementById('idea').value.trim(),
      conociste: document.getElementById('conociste').value
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        let successMsg = formulario.querySelector('.success-message');
        if (!successMsg) {
          successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          formulario.insertBefore(successMsg, formulario.firstChild);
        }
        
        successMsg.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
        successMsg.classList.add('show');
        
        formulario.reset();

        setTimeout(() => successMsg.classList.remove('show'), 5000);
      } else {
        throw new Error(data.message || 'Error al enviar');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario. Por favor intenta nuevamente.');
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Submit';
    }
  });

});