"use client"

import { useState, useMemo } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { mockCustomers, mockEmployees } from "@/data/mock"
import { Search } from "lucide-react"

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Customer {
  id: string;
  name: string;
  company: string;
  location: Location;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  location: Location;
}

interface MarkerInfo extends Location {
  id: string;
  name: string;
  type: 'customer' | 'employee';
  company?: string;
  position?: string;
  department?: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 12rem)",
}

const center = {
  lat: 39.9334,
  lng: 32.8597,
}

export default function MapPage() {
  const [customerSearch, setCustomerSearch] = useState("")
  const [employeeSearch, setEmployeeSearch] = useState("")
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null)

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => 
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.company.toLowerCase().includes(customerSearch.toLowerCase())
    )
  }, [customerSearch])

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter(employee => 
      employee.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      employee.department.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      employee.position.toLowerCase().includes(employeeSearch.toLowerCase())
    )
  }, [employeeSearch])

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Harita</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Müşteri ara..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Personel ara..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={6}
            >
              {filteredCustomers.map((customer) => (
                <Marker
                  key={customer.id}
                  position={customer.location}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  }}
                  onClick={() => setSelectedMarker({
                    ...customer.location,
                    id: customer.id,
                    name: customer.name,
                    type: 'customer',
                    company: customer.company
                  })}
                />
              ))}

              {filteredEmployees.map((employee) => (
                <Marker
                  key={employee.id}
                  position={employee.location}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }}
                  onClick={() => setSelectedMarker({
                    ...employee.location,
                    id: employee.id,
                    name: employee.name,
                    type: 'employee',
                    position: employee.position,
                    department: employee.department
                  })}
                />
              ))}

              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-medium">{selectedMarker.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedMarker.type === 'customer' 
                        ? selectedMarker.company 
                        : `${selectedMarker.position} - ${selectedMarker.department}`}
                    </p>
                    <p className="text-sm text-gray-500">{selectedMarker.address}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </CardContent>
      </Card>
    </div>
  )
}
