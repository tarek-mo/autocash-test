import { Voiture } from "@/types/GetAllVoitures";
import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import {
  Building2Icon,
  CalendarDaysIcon,
  MapPinnedIcon,
  TextSearchIcon,
  UserIcon,
} from "lucide-react-native";
import { formatRelativeTime } from "@/utils/dateFormat";
import CarTypeBadge from "./car-type-badge";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type CarCardProps = {
  voiture: Voiture;
};
const CarCard = ({ voiture }: CarCardProps) => {
  return (
    <View className="bg-white rounded-3xl p-3 relative">
      <View className="rounded-tr-2xl rounded-bl-2xl absolute top-0 right-0 min-w-[100px] px-[11px] py-[7px] flex items-center justify-center bg-azue-radiance-500">
        <Text className="font-outfit-bold text-[15px] text-[#F6F7F9]">
          {voiture.prix} DH
        </Text>
      </View>

      <View className="flex flex-row gap-3 items-center">
        <View className="bg-gray-200 w-[101px] h-20 rounded-2xl items-center justify-center">
          <Image
            style={{ width: 101, height: 80, borderRadius: 16 }}
            source={{ uri: voiture.photoUrl }}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <View className="flex-1 flex flex-col gap-1.5">
          <View className="flex flex-row gap-px items-center">
            <TextSearchIcon color="#2563EB" size={"16px"} />
            <Text className="font-outfit-medium text-[13px] text-azue-radiance-500">
              Ref: {voiture.ref}
            </Text>
          </View>
          <Text className="text-lg font-outfit-medium">
            {voiture.marque.nom} {voiture.modele.nom}
          </Text>
          <View className="flex items-center gap-3 flex-row">
            <View className="flex items-center flex-row gap-[5px]">
              <View className="rounded-full border-[6px] border-[#E2E2E2] bg-azue-radiance-500 h-[30px] w-[30px] flex items-center justify-center">
                {voiture.vendeur.type === "INDIVIDUAL" ? (
                  <UserIcon size={"12px"} color="white" />
                ) : (
                  <Building2Icon size={"12px"} color="white" />
                )}
              </View>
              <Text className="text-lynch-gray-500 font-outfit-medium text-xs">
                {voiture.vendeur.nom}
              </Text>
            </View>

            <View className="flex items-center flex-row gap-[5px]">
              <MapPinnedIcon size={"12px"} color="#64748b" />
              <Text className="text-lynch-gray-500 font-outfit-medium text-xs">
                {voiture.ville.name}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="w-full bg-lynch-gray-100 h-px my-2.5"></View>

      <View className="flex items-center justify-between flex-row">
        <View className="flex flex-row flex-items gap-1.5">
          <CalendarDaysIcon size={"14px"} color="#2563EB" />
          <Text className="font-outfit-medium text-lynch-gray-400 text-xs">
            {formatRelativeTime(voiture.createdAt)}
          </Text>
        </View>

        <CarTypeBadge type={voiture.type} />
      </View>
    </View>
  );
};

export default CarCard;
