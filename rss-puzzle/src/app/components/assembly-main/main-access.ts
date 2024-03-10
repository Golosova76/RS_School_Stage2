// import { Component, InterComponent } from '../base-component';
import MainComponent from '../main/main';

import FormComponent from '../form/form';

import ButtonComponent from '../button/button';

const submitButton = new ButtonComponent({
  className: 'login-button',
  text: 'Login',
  type: 'submit',
  disabled: true,
});

class ComponentAssemblerAccess {
  static assembleMainContent(): MainComponent {
    const mainComponent = new MainComponent();

    // Создание экземпляра формы и добавление его в mainComponent
    const form = new FormComponent();
    mainComponent.appendToContainer(form);
    form.appendToFormDirectly(submitButton);

    return mainComponent;
  }
}

export default ComponentAssemblerAccess;
