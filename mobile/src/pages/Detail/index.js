import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons"; /** icones */
import { useNavigation, useRoute } from "@react-navigation/native";
/**useNavigation usado para trocar entre telas */
/**useRoute usado para pegar informações da pagina atual */
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident =
    route.params.incident; /**incident é o que foi enviado como parametro */

  const incidentTitle = incident.title;
  const incidentValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value);

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${incidentValue}`;

  // function navigateToIncidents() {
  //   navigation.navigate("Incidents");
  // }
  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{incidentValue}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          {incident.whatsapp ? (
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>Whatsapp</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={true} style={styles.actionDisabled}>
              <Text style={styles.actionText}>Whatsapp</Text>
            </TouchableOpacity>
          )}

          {incident.email ? (
            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={true} style={styles.actionDisabled}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
