import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(()=>{
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if(citasStorage){
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCitasStorage();
  },[]);

  

  const eliminarPaciente = id => {

    const citasFiltradas = citas.filter(cita => cita.id !== id);

    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
      <View style={style.contenedor}>
        <Text style={style.titulo}>Administrador de citas</Text>

        <View>
          <TouchableHighlight onPress={()=>mostrarFormulario()} style={style.btnMostrarForm}>
              <Text style={style.textoTextoMostrarForm}>Guardar</Text>
          </TouchableHighlight>
      </View>

        <View style={style.contenido}>
          {mostrarForm ? 
          <>
            <Text style={style.titulo}>Crear nueva cita</Text>
            <Formulario 
              citas = {citas}
              setCitas = {setCitas}
              guardarCitasStorage = {guardarCitasStorage}
              mostrarFormulario = {mostrarFormulario}
            />
          </>
          : 
            <>
              <Text style={style.titulo}>{citas.length > 0 ? 'administra tus citas' : 'no tiene citas'}</Text>
              <FlatList
                style = {style.listado}
                data={citas}
                renderItem={ ({item}) => (
                  <Cita 
                    item={item}
                    eliminarPaciente = {eliminarPaciente}
                  />
                )
                }
                keyExtractor = {cita => cita.id}
              />
            </>
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  titulo : {
    marginTop : Platform.OS === 'ios' ? 40 : 20,
    fontSize : 24,
    fontWeight : 'bold',
    textAlign : 'center',
    color : '#FFFFFF',
    marginBottom : 20
  },
  contenedor : {
    backgroundColor : '#AA076B',
    //minHeight : '100%'
    flex : 1
  },
  contenido : {
    flex : 1,
    marginHorizontal : '2.5%'
  },
  listado : {
    flex : 1,
  },
  btnMostrarForm : {
      padding : 10,
      backgroundColor : '#7d024e',
      marginVertical : 10
  },
  textoTextoMostrarForm : {
      color : '#FFF',
      fontWeight : 'bold',
      textAlign : 'center'
  }
});

export default App;

