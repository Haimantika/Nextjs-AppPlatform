"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface GuestbookEntry {
  id: number
  name: string
  message: string
  created_at: string
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Error fetching entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && message.trim() && !submitting) {
      setSubmitting(true)
      try {
        const response = await fetch('/api/guestbook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            message: message.trim(),
          }),
        })

        if (response.ok) {
          const newEntry = await response.json()
          setEntries([newEntry, ...entries])
          setName("")
          setMessage("")
        } else {
          console.error('Failed to create entry')
        }
      } catch (error) {
        console.error('Error creating entry:', error)
      } finally {
        setSubmitting(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Guestbook</h1>
          <p className="text-muted-foreground text-lg">Share your thoughts and connect with our community</p>
        </div>

        {/* Message Input Form */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-card-foreground">Leave a Message</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Share your thoughts, feedback, or just say hello..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-h-[100px] resize-none"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={submitting}
              >
                {submitting ? "Signing..." : "Sign the Guestbook"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Community Messages ({entries.length})</h2>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading messages...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No messages yet. Be the first to leave a comment!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-card-foreground">{entry.name}</h3>
                      <span className="text-sm text-muted-foreground">{formatDate(entry.created_at)}</span>
                    </div>
                    <p className="text-card-foreground leading-relaxed">{entry.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Thank you for being part of our community!
            <br />
            All messages are public and help create a welcoming space for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}
