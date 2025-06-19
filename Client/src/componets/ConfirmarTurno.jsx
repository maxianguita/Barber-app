// import React, { useState } from "react";
// import HorizontalDatePicker from "@awrminkhodaei/react-horizontal-datepicker";
// import { View, TextInput, Button, Text, Alert } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// const ConfirmarTurno = () => {
//   const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
//   const [horaSeleccionada, setHoraSeleccionada] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [telefono, setTelefono] = useState("");
//   const [servicioSeleccionado, setServicioSeleccionado] = useState("");
//   const [profesionalId, setProfesionalId] = useState("");
//   const [disponibilidadId, setDisponibilidadId] = useState("");

//   const handleConfirmarTurno = () => {
//     console.log({
//       fechaSeleccionada,
//       horaSeleccionada,
//       nombre,
//       telefono,
//       servicioSeleccionado,
//       profesionalId,
//       disponibilidadId,
//     });

//     if (
//       !fechaSeleccionada ||
//       !horaSeleccionada ||
//       nombre.trim() === "" ||
//       telefono.trim() === "" ||
//       servicioSeleccionado === "" ||
//       profesionalId === "" ||
//       disponibilidadId === ""
//     ) {
//       Alert.alert("Error", "Completá todos los campos.");
//       return;
//     }

//     // Aquí va la lógica para guardar el turno
//     Alert.alert("Turno confirmado", `Gracias, ${nombre}`);
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ marginBottom: 10 }}>Seleccioná una fecha:</Text>
//       <HorizontalDatePicker
//         getSelectedDay={(date) => {
//           console.log("Fecha seleccionada:", date);
//           setFechaSeleccionada(new Date(date));
//         }}
//         labelFormat={"MMMM"}
//         color={"#3f51b5"}
//       />

//       <Text style={{ marginTop: 20 }}>Hora:</Text>
//       <TextInput
//         placeholder="Ej: 14:00"
//         value={horaSeleccionada}
//         onChangeText={setHoraSeleccionada}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Nombre:</Text>
//       <TextInput
//         placeholder="Tu nombre"
//         value={nombre}
//         onChangeText={setNombre}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Teléfono:</Text>
//       <TextInput
//         placeholder="Tu teléfono"
//         value={telefono}
//         onChangeText={setTelefono}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//         keyboardType="phone-pad"
//       />

//       <Text>Servicio:</Text>
//       <TextInput
//         placeholder="Servicio que querés"
//         value={servicioSeleccionado}
//         onChangeText={setServicioSeleccionado}
//         style={{ borderBottomWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Profesional:</Text>
//       <Picker
//         selectedValue={profesionalId}
//         onValueChange={(itemValue) => setProfesionalId(itemValue)}
//         style={{ marginBottom: 10 }}
//       >
//         <Picker.Item label="Seleccioná un profesional" value="" />
//         <Picker.Item label="Juan" value="juan" />
//         <Picker.Item label="María" value="maria" />
//       </Picker>

//       <Text>Disponibilidad:</Text>
//       <Picker
//         selectedValue={disponibilidadId}
//         onValueChange={(itemValue) => setDisponibilidadId(itemValue)}
//         style={{ marginBottom: 20 }}
//       >
//         <Picker.Item label="Seleccioná disponibilidad" value="" />
//         <Picker.Item label="Mañana" value="mañana" />
//         <Picker.Item label="Tarde" value="tarde" />
//       </Picker>

//       <Button title="Confirmar Turno" onPress={handleConfirmarTurno} />
//     </View>
//   );
// };

// export default ConfirmarTurno;
