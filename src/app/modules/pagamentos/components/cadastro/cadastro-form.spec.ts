import { CadastroForm } from "./cadastro-form";

describe('CadastroForm', () => {
  let component
  beforeEach(() => {
    component = new CadastroForm()
    component.setValue({
      "id": "idTest",
      "name": "nameTest",
      "value": "valueTest",
      "date": "12/12/2020",
      "title": "Title Test",
    });
  });

  it('should create an instance', () => {
    expect(new CadastroForm()).toBeTruthy();
  });

  it('should be valid if form value is valid', () => {
    expect(component.valid).toEqual(true);
  });

  it('should get id', () => {
    expect(component.id).not.toBeNull();
  });
  it('should get name', () => {
    expect(component.name).not.toBeNull();
  });
  it('should get value', () => {
    expect(component.valor).not.toBeNull();
  });
  it('should get date', () => {
    expect(component.date).not.toBeNull();
  });
  it('should get title', () => {
    expect(component.title).not.toBeNull();
  });


  it('should markAllAsTouched', () => {
    expect(component.markAllAsTouched()).not.toBeNull();
  });

  it('should getDadosEnvioCreate', () => {
    expect(component.getDadosEnvioCreate()).not.toBeNull();
  });

  it('should getDadosEnvioUpdate', () => {
    expect(component.getDadosEnvioUpdate()).not.toBeNull();
  });
  it('should getFirstErrorFrom', () => {
    component = new CadastroForm()
    component.setValue({
      "id": "idTest",
      "name": "",
      "value": "valueTest",
      "date": "12/12/2020",
      "title": "Title Test",
    });
    expect(component.getFirstErrorFrom('name', 'name')).not.toBeNull();
  });

});