import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Ruler,
  Weight,
  Plane,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'
import { mockAirlines } from '../lib/utils'

const Verification = () => {
  const [searchParams] = useSearchParams()
  const [selectedAirline, setSelectedAirline] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredAirlines, setFilteredAirlines] = useState(mockAirlines.slice(0, 5))
  const [dimensions, setDimensions] = useState({
    longueur: '',
    largeur: '',
    hauteur: '',
    poids: ''
  })
  const [results, setResults] = useState(null)
  const [activeTab, setActiveTab] = useState('cabine')

  // Load airline from URL parameter
  useEffect(() => {
    const airlineId = searchParams.get('airline')
    if (airlineId) {
      const airline = mockAirlines.find(a => a.id === parseInt(airlineId))
      if (airline) {
        setSelectedAirline(airline)
      }
    }
  }, [searchParams])

  // Filter airlines based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockAirlines.filter(airline => 
        airline.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.code_iata.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredAirlines(filtered)
    } else {
      setFilteredAirlines(mockAirlines.slice(0, 5))
    }
  }, [searchQuery])

  const handleDimensionChange = (field, value) => {
    setDimensions(prev => ({ ...prev, [field]: value }))
  }

  const checkBaggage = () => {
    if (!selectedAirline || !dimensions.longueur || !dimensions.largeur || !dimensions.hauteur || !dimensions.poids) {
      return
    }

    const bagageType = activeTab === 'cabine' ? selectedAirline.bagageCabine : selectedAirline.bagageSoute
    const userDimensions = {
      longueur: parseFloat(dimensions.longueur),
      largeur: parseFloat(dimensions.largeur),
      hauteur: parseFloat(dimensions.hauteur),
      poids: parseFloat(dimensions.poids)
    }

    let dimensionsOk = false
    let poidsOk = false

    if (activeTab === 'cabine') {
      dimensionsOk = userDimensions.longueur <= bagageType.longueur &&
                     userDimensions.largeur <= bagageType.largeur &&
                     userDimensions.hauteur <= bagageType.hauteur
    } else {
      // For checked baggage, usually it's the sum of dimensions
      const totalDimensions = userDimensions.longueur + userDimensions.largeur + userDimensions.hauteur
      dimensionsOk = totalDimensions <= bagageType.longueur
    }

    poidsOk = userDimensions.poids <= bagageType.poids

    setResults({
      dimensionsOk,
      poidsOk,
      conforme: dimensionsOk && poidsOk,
      bagageType,
      userDimensions
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Vérification de bagages
          </h1>
          <p className="text-xl text-gray-600">
            Vérifiez si vos bagages respectent les dimensions autorisées
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Airline Selection */}
          <div className="space-y-6">
            {/* Step 1: Airline Selection */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  1. Sélectionnez votre compagnie aérienne
                </h2>
                
                {selectedAirline ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-900">{selectedAirline.nom}</h3>
                          <Badge variant="outline" className="text-green-700 border-green-300">
                            {selectedAirline.code_iata}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedAirline(null)}
                        className="text-green-700 border-green-300 hover:bg-green-100"
                      >
                        Changer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Rechercher une compagnie..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="grid gap-3 max-h-64 overflow-y-auto">
                      {filteredAirlines.map((airline) => (
                        <div
                          key={airline.id}
                          onClick={() => setSelectedAirline(airline)}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Plane className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{airline.nom}</div>
                            <Badge variant="outline" className="text-xs">{airline.code_iata}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Baggage Type */}
            {selectedAirline && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    2. Type de bagage
                  </h2>
                  
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setActiveTab('cabine')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'cabine'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Bagage cabine
                    </button>
                    <button
                      onClick={() => setActiveTab('soute')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'soute'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Bagage soute
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Dimensions Input */}
          <div className="space-y-6">
            {selectedAirline && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    3. Dimensions de votre bagage
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        Longueur (cm)
                      </label>
                      <Input
                        type="number"
                        value={dimensions.longueur}
                        onChange={(e) => handleDimensionChange('longueur', e.target.value)}
                        placeholder="55"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        Largeur (cm)
                      </label>
                      <Input
                        type="number"
                        value={dimensions.largeur}
                        onChange={(e) => handleDimensionChange('largeur', e.target.value)}
                        placeholder="35"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        Hauteur (cm)
                      </label>
                      <Input
                        type="number"
                        value={dimensions.hauteur}
                        onChange={(e) => handleDimensionChange('hauteur', e.target.value)}
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Weight className="w-4 h-4 inline mr-1" />
                        Poids (kg)
                      </label>
                      <Input
                        type="number"
                        value={dimensions.poids}
                        onChange={(e) => handleDimensionChange('poids', e.target.value)}
                        placeholder="12"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={checkBaggage}
                    disabled={!selectedAirline || !dimensions.longueur || !dimensions.largeur || !dimensions.hauteur || !dimensions.poids}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3"
                  >
                    Vérifier mon bagage
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {results && (
              <Card className={`shadow-lg border-0 ${results.conforme ? 'border-green-200' : 'border-red-200'}`}>
                <CardHeader className={`${results.conforme ? 'bg-green-50' : 'bg-red-50'} rounded-t-lg`}>
                  <CardTitle className="flex items-center space-x-2">
                    {results.conforme ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className={results.conforme ? 'text-green-900' : 'text-red-900'}>
                      {results.conforme ? 'Bagage conforme !' : 'Bagage non conforme'}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${results.dimensionsOk ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {results.dimensionsOk ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`font-medium ${results.dimensionsOk ? 'text-green-900' : 'text-red-900'}`}>
                            Dimensions
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {activeTab === 'cabine' ? (
                            `Max: ${results.bagageType.longueur} × ${results.bagageType.largeur} × ${results.bagageType.hauteur} cm`
                          ) : (
                            `Max: ${results.bagageType.longueur} cm (somme)`
                          )}
                        </div>
                        <div className="text-sm font-medium">
                          Vos: {results.userDimensions.longueur} × {results.userDimensions.largeur} × {results.userDimensions.hauteur} cm
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${results.poidsOk ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {results.poidsOk ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`font-medium ${results.poidsOk ? 'text-green-900' : 'text-red-900'}`}>
                            Poids
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Max: {results.bagageType.poids} kg
                        </div>
                        <div className="text-sm font-medium">
                          Vos: {results.userDimensions.poids} kg
                        </div>
                      </div>
                    </div>

                    {!results.conforme && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900 mb-1">Recommandations</h4>
                            <ul className="text-sm text-yellow-800 space-y-1">
                              {!results.dimensionsOk && (
                                <li>• Réduisez les dimensions de votre bagage</li>
                              )}
                              {!results.poidsOk && (
                                <li>• Réduisez le poids de votre bagage</li>
                              )}
                              <li>• Contactez votre compagnie aérienne pour plus d'informations</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verification