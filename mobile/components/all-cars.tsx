import { getALlVoitures } from "@/api/getAllVoitures";
import { isAxiosError } from "axios";
import { GetAllVoituresResponse } from "@/types/GetAllVoitures";
import React, { useEffect, useState, useCallback } from "react";
import { Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import CarCard from "./car-card";

type AllCarsProps = {
  searchQuery?: string;
};

const AllCars = ({ searchQuery }: AllCarsProps) => {
  const [voitures, setVoitures] = useState<GetAllVoituresResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const data = await getALlVoitures(searchQuery);
      setVoitures(data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setErrorMsg(
          error.response.data.message ||
            "Une erreur est survenue lors de la récupération des données."
        );
      } else {
        setErrorMsg(
          "Une erreur est survenue lors de la récupération des données."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, refreshTrigger]);

  useFocusEffect(
    useCallback(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, [])
  );

  if (isLoading) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      className="flex flex-col gap-3"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
    >
      {voitures.length > 0 ? (
        voitures.map((voiture) => (
          <CarCard key={voiture.id} voiture={voiture} />
        ))
      ) : (
        <Text>Non voitures disponible pour vendre</Text>
      )}
    </ScrollView>
  );
};

export default AllCars;
