import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  ArrowLeft,
  ImageIcon,
  PenIcon,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Gauge,
  FileTextIcon,
  UploadIcon,
  BellIcon,
  CircleEllipsisIcon,
} from "lucide-react-native";
import { getAllMarques } from "@/api/getAllMarques";
import { getAllModeles } from "@/api/getAllModeles";
import { getAllVilles } from "@/api/getAllVilles";
import { createVoiture } from "@/api/createVoiture";
import { Marque } from "@/types/Marque";
import { Modele } from "@/types/Modele";
import { Ville } from "@/types/GetAllVoitures";
import { Colors } from "@/constants/theme";
import { isAxiosError } from "axios";
import Input from "@/components/ui/input";
import CustomPicker from "@/components/ui/picker";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCarFormSchema,
  CreateCarFormInputs,
} from "@/types/validation/CreateCarValidation";

export default function AddCarScreen() {
  const [marques, setMarques] = useState<Marque[]>([]);
  const [modeles, setModeles] = useState<Modele[]>([]);
  const [villes, setVilles] = useState<Ville[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState<any>(null);

  const {
    control,
    handleSubmit: handleFormSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CreateCarFormInputs>({
    resolver: zodResolver(CreateCarFormSchema),
    defaultValues: {
      prix: "",
      marqueId: "",
      modeleId: "",
      anneeMiseCirculation: "",
      moisMiseCirculation: "",
      kilometrage: "",
      villeId: "",
      vendeur: {
        type: "INDIVIDUAL",
        nom: "",
        tel: "",
        email: "",
        adresse: "",
        villeId: "",
      },
    },
    mode: "onBlur",
  });

  const marqueId = watch("marqueId");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (marqueId) {
      loadModeles(marqueId);
    } else {
      setModeles([]);
      setValue("modeleId", "");
    }
  }, [marqueId, setValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [marquesData, villesData] = await Promise.all([
        getAllMarques(),
        getAllVilles(),
      ]);
      setMarques(marquesData);
      setVilles(villesData);
    } catch {
      Alert.alert("Erreur", "Impossible de charger les données");
    } finally {
      setLoading(false);
    }
  };

  const loadModeles = async (marqueId: string) => {
    try {
      const modelesData = await getAllModeles(marqueId);
      setModeles(modelesData);
    } catch {
      Alert.alert("Erreur", "Impossible de charger les modèles du marque");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const onSubmit = async (data: CreateCarFormInputs) => {
    if (!photo) {
      Alert.alert("Erreur", "La photo est requise");
      return;
    }

    setSubmitting(true);
    try {
      const dataToSend = {
        ...data,
        prix: Number(data.prix),
        anneeMiseCirculation: Number(data.anneeMiseCirculation),
        moisMiseCirculation: Number(data.moisMiseCirculation),
        kilometrage: Number(data.kilometrage),
      };

      await createVoiture(dataToSend, photo);
      Alert.alert("Succès", "Voiture ajoutée avec succès", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.log("error", error);

      let errorMessage = "Une erreur s'est produite lors de l'envoi du voiture";
      if (isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Erreur", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-main-gray">
        <ActivityIndicator size="large" color={Colors.azueRadiance500} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex px-4 pt-25 pb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={20} color={"#212121"} />
          </Pressable>
          <Text className="text-xl text-[#212121] font-outfit-medium">
            Ajouter une voiture
          </Text>
        </View>

        <View className="flex flex-row items-center gap-4">
          <Pressable onPress={() => {}}>
            <BellIcon size={17} color={"#212121"} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <CircleEllipsisIcon size={21} color={"#212121"} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20, gap: 20 }}
      >
        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Prix *
          </Text>
          <Controller
            control={control}
            name="prix"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  style={{ color: Colors.azueRadiance500 }}
                  placeholder="150000"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.prix}
                  rightIcon={<PenIcon size={20} color={"black"} />}
                />
                {errors.prix && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.prix.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View className="flex flex-row gap-4 items-center">
          <View className="w-[52px] h-[52px] flex items-center justify-center bg-azue-radiance-500 border-8 border-azue-radiance-100 rounded-full">
            <FileTextIcon size={16} color={"white"} />
          </View>
          <Text className="text-lg font-outfit-semi-bold text-azue-radiance-500">
            Informations du vendeur
          </Text>
        </View>

        <View className="">
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Type de vendeur *
          </Text>
          <Controller
            control={control}
            name="vendeur.type"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomPicker
                  selectedValue={value}
                  onValueChange={onChange}
                  hasError={!!errors.vendeur?.type}
                >
                  <Picker.Item label="Individuel" value="INDIVIDUAL" />
                  <Picker.Item label="Professionnel" value="PROFESSIONAL" />
                  <Picker.Item label="Dealer" value="DEALER" />
                </CustomPicker>
                {errors.vendeur?.type && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.vendeur.type.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Nom du vendeur *
          </Text>
          <Controller
            control={control}
            name="vendeur.nom"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Mohammed Alami"
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.vendeur?.nom}
                  rightIcon={<User size={20} color={"black"} />}
                />
                {errors.vendeur?.nom && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.vendeur.nom.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Tél *
          </Text>
          <Controller
            control={control}
            name="vendeur.tel"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="+212612345678"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.vendeur?.tel}
                  rightIcon={<Phone size={20} color={"black"} />}
                />
                {errors.vendeur?.tel && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.vendeur.tel.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Email *
          </Text>
          <Controller
            control={control}
            name="vendeur.email"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.vendeur?.email}
                  rightIcon={<Mail size={20} color={"black"} />}
                />
                {errors.vendeur?.email && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.vendeur.email.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Ville du vendeur *
          </Text>
          <Controller
            control={control}
            name="vendeur.villeId"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomPicker
                  selectedValue={value}
                  onValueChange={onChange}
                  hasError={!!errors.vendeur?.villeId}
                >
                  <Picker.Item label="Sélectionner une ville" value="" />
                  {villes.map((ville) => (
                    <Picker.Item
                      key={ville.id}
                      label={ville.name}
                      value={ville.id}
                    />
                  ))}
                </CustomPicker>
                {errors.vendeur?.villeId && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.vendeur.villeId.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Adresse *
          </Text>
          <Controller
            control={control}
            name="vendeur.adresse"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="123 Rue Example"
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.vendeur?.adresse}
                  rightIcon={<MapPin size={20} color={"black"} />}
                />
                {errors.vendeur?.adresse && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.vendeur.adresse.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View className="flex flex-row gap-4 items-center">
          <View className="w-[52px] h-[52px] flex items-center justify-center bg-azue-radiance-500 border-8 border-azue-radiance-100 rounded-full">
            <FileTextIcon size={16} color={"white"} />
          </View>
          <Text className="text-lg font-outfit-semi-bold text-azue-radiance-500">
            Informations de la voiture
          </Text>
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Marque *
          </Text>
          <Controller
            control={control}
            name="marqueId"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomPicker
                  selectedValue={value}
                  onValueChange={onChange}
                  hasError={!!errors.marqueId}
                >
                  <Picker.Item label="Sélectionner une marque" value="" />
                  {marques.map((marque) => (
                    <Picker.Item
                      key={marque.id}
                      label={marque.nom}
                      value={marque.id}
                    />
                  ))}
                </CustomPicker>
                {errors.marqueId && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.marqueId.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Modèle *
          </Text>
          <Controller
            control={control}
            name="modeleId"
            rules={{ required: "Le modèle est requis" }}
            render={({ field: { onChange, value } }) => (
              <>
                <CustomPicker
                  selectedValue={value}
                  onValueChange={onChange}
                  enabled={!!marqueId && modeles.length > 0}
                  hasError={!!errors.modeleId}
                >
                  <Picker.Item label="Sélectionner un modèle" value="" />
                  {modeles.map((modele) => (
                    <Picker.Item
                      key={modele.id}
                      label={modele.nom}
                      value={modele.id}
                    />
                  ))}
                </CustomPicker>
                {errors.modeleId && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.modeleId.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Année de mise en circulation *
          </Text>
          <Controller
            control={control}
            name="anneeMiseCirculation"
            rules={{ required: "L'année est requise" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="2020"
                  keyboardType="numeric"
                  maxLength={4}
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.anneeMiseCirculation}
                  rightIcon={<Calendar size={20} color={"black"} />}
                />
                {errors.anneeMiseCirculation && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.anneeMiseCirculation.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Mois de mise en circulation *
          </Text>
          <Controller
            control={control}
            name="moisMiseCirculation"
            rules={{ required: "Le mois est requis" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="1-12"
                  keyboardType="numeric"
                  maxLength={2}
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.moisMiseCirculation}
                  rightIcon={<Calendar size={20} color={"black"} />}
                />
                {errors.moisMiseCirculation && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.moisMiseCirculation.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Kilométrage *
          </Text>
          <Controller
            control={control}
            name="kilometrage"
            rules={{ required: "Le kilométrage est requis" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="50000"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  hasError={!!errors.kilometrage}
                  rightIcon={<Gauge size={20} color={"black"} />}
                />
                {errors.kilometrage && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.kilometrage.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Ville *
          </Text>
          <Controller
            control={control}
            name="villeId"
            rules={{ required: "La ville est requise" }}
            render={({ field: { onChange, value } }) => (
              <>
                <CustomPicker
                  selectedValue={value}
                  onValueChange={onChange}
                  hasError={!!errors.villeId}
                >
                  <Picker.Item label="Sélectionner une ville" value="" />
                  {villes.map((ville) => (
                    <Picker.Item
                      key={ville.id}
                      label={ville.name}
                      value={ville.id}
                    />
                  ))}
                </CustomPicker>
                {errors.villeId && (
                  <Text className="text-red-500 text-xs mt-1 font-outfit-regular">
                    {errors.villeId.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View>
          <Text className="text-black mb-2.5 font-outfit-light text-sm">
            Photo voiture *
          </Text>
          <Pressable
            onPress={pickImage}
            className="py-4.5 rounded-4xl items-center border border-azue-radiance-500 bg-transparent"
          >
            {photo ? (
              <View className="flex-row items-center gap-2">
                <ImageIcon size={20} color={Colors.azueRadiance500} />
                <Text className="text-azue-radiance-500 font-outfit-bold text-base">
                  Photo sélectionnée
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-4">
                <Text className="text-azue-radiance-500 font-outfit-bold text-base">
                  Charger une photo
                </Text>
                <UploadIcon size={15} color={Colors.azueRadiance500} />
              </View>
            )}
          </Pressable>
        </View>
        <Pressable
          onPress={handleFormSubmit(onSubmit)}
          disabled={submitting}
          className="bg-azue-radiance-500 py-4.5 rounded-4xl items-center mt-6 mb-5"
        >
          {submitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-outfit-bold text-base">
              Confirmer
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}
