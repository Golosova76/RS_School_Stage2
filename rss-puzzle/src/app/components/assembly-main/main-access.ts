import MainComponent from '../main/main';

import FormComponent from '../form/form';

import ButtonComponent from '../button/button';

class ComponentAssemblerAccess {
  static assembleMainContent(): {
    mainComponent: MainComponent;
    form: FormComponent;
    submitButton: ButtonComponent;
  } {
    const mainComponent = new MainComponent();

    const submitButton = new ButtonComponent({
      className: 'login-button',
      text: 'Login',
      type: 'submit',
      disabled: true,
    });

    // Создание экземпляра формы и добавление его в mainComponent
    const form = new FormComponent();
    mainComponent.appendToContainer(form);

    form.appendToFormDirectly(submitButton);

    return { mainComponent, form, submitButton };
  }
}

export default ComponentAssemblerAccess;
