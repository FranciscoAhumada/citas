import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';


const Formulario = ({citas, setCitas, guardarCitasStorage, mostrarFormulario}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintomas, guardarSintomas] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = {year : 'numeric', month : 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    const opciones = {hour : 'numeric', minute: '2-digit'};
    guardarHora(hora.toLocaleTimeString('es-ES', opciones));
    hideTimePicker();
  };

  const crearCita = () => {
      if(paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || sintomas.trim() === '' || hora.trim() === '' || fecha.trim() === ''){
            mostrarAlerta();
            return;
      }
      const cita = {paciente, propietario, telefono, sintoma : sintomas, fecha, hora};

      cita.id = shortid.generate();
      console.log(cita);
      const citasNuevas = [...citas, cita];
      setCitas(citasNuevas); 
      guardarCitasStorage(JSON.stringify(citasNuevas));
      mostrarFormulario();
  };

  const mostrarAlerta = () => {
      Alert.alert(
          'Error',
          'Todos los campos obligatorios',
          [{
              text : 'OK'
          }]
      )
  }

return (
    <>
        <ScrollView style={style.formulario}>
            <View>
                <Text style={style.label}>Paciente:</Text>
                <TextInput
                    style={style.input}
                    onChangeText = {(texto) => guardarPaciente(texto)}
                />
            </View>
            <View>
                <Text style={style.label}>Dueño:</Text>
                <TextInput
                    style={style.input}
                    onChangeText = {(texto) => guardarPropietario(texto)}
                />
            </View>
            <View>
                <Text style={style.label}>Telefono:</Text>
                <TextInput
                    style={style.input}
                    onChangeText = {(texto) => guardarTelefono(texto)}
                    keyboardType = 'numeric'
                />
            </View>
            <View>
                <Text style={style.label}>Fecha :</Text>
                <Button title="Seleccione dia" onPress={showDatePicker} />
                <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={hideDatePicker}
                locale = 'es_ES'
                headerTextIOS = "Elige dia"
                cancelTextIOS = 'cancelar'
                confirmTextIOS = 'confirmar'
                />
                <Text>{fecha}</Text>
            </View>

            <View>
                <Text style={style.label}>Hora : </Text>
                <Button title="Seleccione hora" onPress={showTimePicker} />
                <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={confirmarHora}
                onCancel={hideTimePicker}
                locale = 'es_ES'
                headerTextIOS = "Elige hora"
                cancelTextIOS = 'cancelar'
                confirmTextIOS = 'confirmar'
                is24Hour
                />
                <Text>{hora}</Text>
            </View>
            
            <View>
                <Text style={style.label}>Sintomas:</Text>
                <TextInput
                    multiline
                    style={style.input}
                    onChangeText = {(texto) => guardarSintomas(texto)}
                />
            </View>

            <View>
                <TouchableHighlight onPress={()=>crearCita()} style={style.btnSubmit}>
                    <Text style={style.textoSubmit}>Guardar</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    </>
)
}

const style = StyleSheet.create({
    label :{
        fontWeight : 'bold',
        fontSize : 18,
        marginTop : 20
    },
    input: {
        marginTop : 10,
        height : 50,
        borderColor : '#e1e1e1',
        borderWidth : 1,
        borderStyle : 'solid'
    },
    formulario : {
        backgroundColor : '#FFF',
        paddingHorizontal: 20,
        paddingVertical : 10,
    },
    btnSubmit : {
        padding : 10,
        backgroundColor : '#7d024e',
        marginVertical : 10
    },
    textoSubmit : {
        color : '#FFF',
        fontWeight : 'bold',
        textAlign : 'center'
    }
})

export default Formulario;