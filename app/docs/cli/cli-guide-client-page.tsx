"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Terminal, Download, Settings, HelpCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function CLIGuideClientPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24">
              <Card className="bg-[#0a0a0a] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">CLI Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <a href="#installation" className="block text-white/70 hover:text-white transition-colors">
                      Installation
                    </a>
                    <a href="#authentication" className="block text-white/70 hover:text-white transition-colors">
                      Authentication
                    </a>
                    <a href="#commands" className="block text-white/70 hover:text-white transition-colors">
                      Commands
                    </a>
                    <a href="#examples" className="block text-white/70 hover:text-white transition-colors">
                      Examples
                    </a>
                    <a href="#configuration" className="block text-white/70 hover:text-white transition-colors">
                      Configuration
                    </a>
                    <a href="#troubleshooting" className="block text-white/70 hover:text-white transition-colors">
                      Troubleshooting
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">CLI Guide</h1>
              <p className="text-white/80 text-lg">
                Complete guide to using the Peculia Command Line Interface for managing your projects and interactions.
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Installation Section */}
              <section id="installation">
                <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Download className="h-5 w-5 mr-2" />
                      Installation
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Install the Peculia CLI using your preferred package manager
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs defaultValue="npm" className="w-full">
                      <TabsList className="bg-[#1a1a1a] border border-white/10">
                        <TabsTrigger value="npm" className="data-[state=active]:bg-white/10">
                          npm
                        </TabsTrigger>
                        <TabsTrigger value="yarn" className="data-[state=active]:bg-white/10">
                          yarn
                        </TabsTrigger>
                        <TabsTrigger value="pnpm" className="data-[state=active]:bg-white/10">
                          pnpm
                        </TabsTrigger>
                        <TabsTrigger value="bun" className="data-[state=active]:bg-white/10">
                          bun
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="npm" className="mt-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                          <code className="text-green-400">npm install -g @peculia/cli</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => copyToClipboard("npm install -g @peculia/cli", "npm-install")}
                          >
                            {copiedCode === "npm-install" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="yarn" className="mt-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                          <code className="text-green-400">yarn global add @peculia/cli</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => copyToClipboard("yarn global add @peculia/cli", "yarn-install")}
                          >
                            {copiedCode === "yarn-install" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="pnpm" className="mt-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                          <code className="text-green-400">pnpm add -g @peculia/cli</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => copyToClipboard("pnpm add -g @peculia/cli", "pnpm-install")}
                          >
                            {copiedCode === "pnpm-install" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="bun" className="mt-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                          <code className="text-green-400">bun add -g @peculia/cli</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => copyToClipboard("bun add -g @peculia/cli", "bun-install")}
                          >
                            {copiedCode === "bun-install" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-4">
                      <h4 className="text-white font-medium mb-2">Verify Installation</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia --version</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard("peculia --version", "verify")}
                        >
                          {copiedCode === "verify" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Authentication Section */}
              <section id="authentication">
                <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Authentication
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Authenticate with your Peculia account to access platform features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Login to your account</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia auth login</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard("peculia auth login", "auth-login")}
                        >
                          {copiedCode === "auth-login" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-white/60 text-sm mt-2">
                        This will open your browser to authenticate with your Peculia account.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Check authentication status</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia auth status</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard("peculia auth status", "auth-status")}
                        >
                          {copiedCode === "auth-status" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Logout</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia auth logout</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard("peculia auth logout", "auth-logout")}
                        >
                          {copiedCode === "auth-logout" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Commands Section */}
              <section id="commands">
                <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Terminal className="h-5 w-5 mr-2" />
                      Available Commands
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Complete reference of all available CLI commands
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Prediction Markets Commands */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        Prediction Markets
                        <Badge className="ml-2 bg-blue-500/20 text-blue-400">predictions</Badge>
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia predictions list</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia predictions list", "pred-list")}
                            >
                              {copiedCode === "pred-list" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">List all active prediction markets</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">
                              peculia predictions create --title "Market Title"
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                copyToClipboard('peculia predictions create --title "Market Title"', "pred-create")
                              }
                            >
                              {copiedCode === "pred-create" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Create a new prediction market</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">
                              peculia predictions bet &lt;id&gt; --amount 100 --outcome yes
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                copyToClipboard("peculia predictions bet <id> --amount 100 --outcome yes", "pred-bet")
                              }
                            >
                              {copiedCode === "pred-bet" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Place a bet on a prediction market</p>
                        </div>
                      </div>
                    </div>

                    {/* Token Pitching Commands */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        Token Pitching
                        <Badge className="ml-2 bg-purple-500/20 text-purple-400">tokens</Badge>
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia tokens list</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia tokens list", "token-list")}
                            >
                              {copiedCode === "token-list" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">List all token pitches</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">
                              peculia tokens create --name "TokenName" --symbol "TKN"
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                copyToClipboard(
                                  'peculia tokens create --name "TokenName" --symbol "TKN"',
                                  "token-create",
                                )
                              }
                            >
                              {copiedCode === "token-create" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Create a new token pitch</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia tokens simulate &lt;id&gt;</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia tokens simulate <id>", "token-simulate")}
                            >
                              {copiedCode === "token-simulate" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Run token economics simulation</p>
                        </div>
                      </div>
                    </div>

                    {/* Quest System Commands */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        Quest System
                        <Badge className="ml-2 bg-orange-500/20 text-orange-400">quests</Badge>
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia quests list</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia quests list", "quest-list")}
                            >
                              {copiedCode === "quest-list" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">List all available quests</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia quests join &lt;id&gt;</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia quests join <id>", "quest-join")}
                            >
                              {copiedCode === "quest-join" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Join a quest</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia quests progress</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia quests progress", "quest-progress")}
                            >
                              {copiedCode === "quest-progress" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Check your quest progress</p>
                        </div>
                      </div>
                    </div>

                    {/* Quadratic Funding Commands */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        Quadratic Funding
                        <Badge className="ml-2 bg-green-500/20 text-green-400">funding</Badge>
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">peculia funding list</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard("peculia funding list", "funding-list")}
                            >
                              {copiedCode === "funding-list" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">List all funding proposals</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">
                              peculia funding create --title "Proposal Title"
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                copyToClipboard('peculia funding create --title "Proposal Title"', "funding-create")
                              }
                            >
                              {copiedCode === "funding-create" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Create a funding proposal</p>
                        </div>

                        <div className="bg-[#1a1a1a] p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-green-400 text-sm">
                              peculia funding contribute &lt;id&gt; --amount 50
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                copyToClipboard("peculia funding contribute <id> --amount 50", "funding-contribute")
                              }
                            >
                              {copiedCode === "funding-contribute" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-white/60 text-xs">Contribute to a funding proposal</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Examples Section */}
              <section id="examples">
                <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Usage Examples</CardTitle>
                    <CardDescription className="text-white/70">Common workflows and example commands</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Creating and Managing a Token Pitch</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2">
                        <div className="text-white/60 text-sm"># Create a new token pitch</div>
                        <code className="text-green-400 block">
                          peculia tokens create --name "DeFi Token" --symbol "DFT" --supply 1000000
                        </code>
                        <div className="text-white/60 text-sm"># List your token pitches</div>
                        <code className="text-green-400 block">peculia tokens list --mine</code>
                        <div className="text-white/60 text-sm"># Run simulation for your token</div>
                        <code className="text-green-400 block">
                          peculia tokens simulate abc123 --scenarios bullish,bearish
                        </code>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Participating in Prediction Markets</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2">
                        <div className="text-white/60 text-sm"># Browse active markets</div>
                        <code className="text-green-400 block">peculia predictions list --status active</code>
                        <div className="text-white/60 text-sm"># Get market details</div>
                        <code className="text-green-400 block">peculia predictions show xyz789</code>
                        <div className="text-white/60 text-sm"># Place a bet</div>
                        <code className="text-green-400 block">
                          peculia predictions bet xyz789 --amount 100 --outcome yes
                        </code>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-3">Quest Participation Workflow</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2">
                        <div className="text-white/60 text-sm"># Find available quests</div>
                        <code className="text-green-400 block">peculia quests list --difficulty easy</code>
                        <div className="text-white/60 text-sm"># Join a quest</div>
                        <code className="text-green-400 block">peculia quests join quest456</code>
                        <div className="text-white/60 text-sm"># Check your progress</div>
                        <code className="text-green-400 block">peculia quests progress --quest quest456</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Configuration Section */}
              <section id="configuration">
                <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Configuration
                    </CardTitle>
                    <CardDescription className="text-white/70">Customize CLI behavior and settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Global Configuration</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia config set --api-url https://api.peculia.com</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() =>
                            copyToClipboard("peculia config set --api-url https://api.peculia.com", "config-api")
                          }
                        >
                          {copiedCode === "config-api" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">View Current Configuration</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia config list</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard("peculia config list", "config-list")}
                        >
                          {copiedCode === "config-list" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Output Format</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg relative">
                        <code className="text-green-400">peculia config set --output json</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => copyToClipboard("peculia config set --output json", "config-output")}
                        >
                          {copiedCode === "config-output" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-white/60 text-sm mt-2">Available formats: json, table, yaml</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Troubleshooting Section */}
              <section id="troubleshooting">
                <Card className="bg-[#0a0a0a] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Troubleshooting
                    </CardTitle>
                    <CardDescription className="text-white/70">Common issues and solutions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Authentication Issues</h4>
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg mb-2">
                        <p className="text-red-400 text-sm font-medium">Error: Authentication failed</p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <p className="text-white/70 text-sm mb-2">Solution:</p>
                        <code className="text-green-400 text-sm block mb-1">peculia auth logout</code>
                        <code className="text-green-400 text-sm block">peculia auth login</code>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Network Connection Issues</h4>
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg mb-2">
                        <p className="text-red-400 text-sm font-medium">Error: Network timeout</p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <p className="text-white/70 text-sm mb-2">Solution:</p>
                        <code className="text-green-400 text-sm block mb-1">peculia config set --timeout 30000</code>
                        <code className="text-green-400 text-sm block">peculia config set --retry 3</code>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Command Not Found</h4>
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg mb-2">
                        <p className="text-red-400 text-sm font-medium">Error: command not found: peculia</p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <p className="text-white/70 text-sm mb-2">Solution:</p>
                        <code className="text-green-400 text-sm block mb-1">npm install -g @peculia/cli</code>
                        <p className="text-white/60 text-xs mt-2">Or add to your PATH if installed locally</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Get Help</h4>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2">
                        <code className="text-green-400 text-sm block">peculia --help</code>
                        <code className="text-green-400 text-sm block">peculia &lt;command&gt; --help</code>
                        <code className="text-green-400 text-sm block">peculia support</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
