/**
 * Registration Page for Aerophilia 2025
 * Multi-step registration form with payment integration
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, School, CreditCard, Check, ArrowLeft, ArrowRight, Upload, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { RegistrationPageProps } from './RegistrationPage.types';

const RegistrationPage: React.FC<RegistrationPageProps> = ({ className }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Academic Info
    college: '',
    course: '',
    year: '',
    rollNumber: '',
    
    // Event Selection
    selectedEvents: [] as string[],
    
    // Payment Info
    paymentMethod: '',
    totalAmount: 0
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Academic Details', icon: School },
    { id: 3, title: 'Event Selection', icon: Calendar },
    { id: 4, title: 'Payment', icon: CreditCard },
    { id: 5, title: 'Confirmation', icon: Check }
  ];

  const events = [
    { id: 'aero', name: 'Aeromodelling Championship', price: 500 },
    { id: 'drone', name: 'Drone Racing Circuit', price: 300 },
    { id: 'design', name: 'Aircraft Design Challenge', price: 400 },
    { id: 'simulation', name: 'Flight Simulation Challenge', price: 250 },
    { id: 'innovation', name: 'Aviation Innovation Pitch', price: 600 },
    { id: 'paper', name: 'Paper Plane Olympics', price: 150 }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.3 }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEventSelection = (eventId: string) => {
    const updatedEvents = formData.selectedEvents.includes(eventId)
      ? formData.selectedEvents.filter(id => id !== eventId)
      : [...formData.selectedEvents, eventId];
    
    const totalAmount = updatedEvents.reduce((sum, id) => {
      const event = events.find(e => e.id === id);
      return sum + (event?.price || 0);
    }, 0);

    handleInputChange('selectedEvents', updatedEvents);
    handleInputChange('totalAmount', totalAmount.toString());
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-6 text-center">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Select your date of birth"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-6 text-center">Academic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">College/University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your college/university name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Select your course"
                >
                  <option value="">Select your course</option>
                  <option value="aeronautical">Aeronautical Engineering</option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="computer">Computer Science</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year of Study</label>
                <select
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Select your year of study"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="postgrad">Post Graduate</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Roll Number</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your roll number"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-6 text-center">Select Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.selectedEvents.includes(event.id)
                      ? 'border-blue-400 bg-blue-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                  onClick={() => handleEventSelection(event.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{event.name}</h3>
                      <p className="text-green-400 font-bold">₹{event.price}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.selectedEvents.includes(event.id)
                        ? 'border-blue-400 bg-blue-400'
                        : 'border-gray-400'
                    }`}>
                      {formData.selectedEvents.includes(event.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-400">₹{formData.totalAmount}</span>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div className="space-y-6" {...fadeInUp}>
            <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              {formData.selectedEvents.map(eventId => {
                const event = events.find(e => e.id === eventId);
                return event ? (
                  <div key={eventId} className="flex justify-between py-2">
                    <span>{event.name}</span>
                    <span>₹{event.price}</span>
                  </div>
                ) : null;
              })}
              <hr className="my-4 border-gray-600" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-400">₹{formData.totalAmount}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['UPI', 'Debit Card', 'Credit Card', 'Net Banking'].map((method) => (
                  <motion.div
                    key={method}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === method
                        ? 'border-blue-400 bg-blue-500/20'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                    onClick={() => handleInputChange('paymentMethod', method)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-center font-semibold">{method}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div className="space-y-6 text-center" {...fadeInUp}>
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-green-400">Registration Successful!</h2>
            <p className="text-lg text-gray-300">
              Thank you for registering for Aerophilia 2025. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600 max-w-md mx-auto">
              <h3 className="font-semibold mb-4">Registration Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Events:</span>
                  <span>{formData.selectedEvents.length}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Paid:</span>
                  <span className="text-green-400">₹{formData.totalAmount}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full min-h-screen bg-black text-white ${className}`}>
      {/* Progress Header */}
      <section className="w-full bg-gray-900/50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-400' : 'text-gray-400'
                  }`}>
                    Step {step.id}
                  </div>
                  <div className={`text-xs ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-500' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={currentStep === steps.length ? () => window.location.href = '/' : nextStep}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {currentStep === steps.length ? 'Go to Home' : 'Next'}
              {currentStep !== steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;
