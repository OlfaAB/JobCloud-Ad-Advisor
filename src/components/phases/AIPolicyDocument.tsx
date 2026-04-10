import React, { useState } from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';
import { generateAIPolicyDocument } from '../../utils/generateAIPolicyDocument';

const AIPolicyDocument: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateAIPolicyDocument();
      setIsGenerated(true);
      setTimeout(() => setIsGenerated(false), 3000);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">AI Policy Document</h1>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Download the complete AI Policy document with all executive choices and governance framework.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-blue-900 mb-2">Document Includes:</h2>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Document Control & Version Information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Purpose & Scope (AI Systems, Roles, Geographical Coverage)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Six Mandatory Principles for Responsible AI</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Governance Commitments & AI Steering Committee</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Roles & Responsibilities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>AI System Classification & Risk-Based Controls</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Lifecycle Integration & Enforcement Mechanisms</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Exceptions & Escalation Procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Training & Communication Plan</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-lg
            flex items-center justify-center gap-3
            transition-all duration-200
            ${
              isGenerating
                ? 'bg-gray-400 cursor-not-allowed'
                : isGenerated
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }
            text-white shadow-md hover:shadow-lg
          `}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Document...
            </>
          ) : isGenerated ? (
            <>
              <CheckCircle className="w-6 h-6" />
              Document Downloaded!
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              Download Word Document
            </>
          )}
        </button>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Format:</strong> Microsoft Word (.docx)
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>File Name:</strong> AI_Policy_Document.docx
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Version:</strong> 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIPolicyDocument;
