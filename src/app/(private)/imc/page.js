// src/app/(private)/imc/page.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusIcon, PencilIcon, Trash2Icon, ScaleIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

const API_URL = "http://localhost:5500/api/imc";

const CATEGORY_COLORS = {
  "Abaixo do peso": "secondary",
  "Normal": "default",
  "Sobrepeso": "outline",
  "Obesidade Grau I": "destructive",
  "Obesidade Grau II": "destructive",
  "Obesidade Grau III": "destructive",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ImcPage() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Modal de criar/editar
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null); // null = criando, objeto = editando
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroForm, setErroForm] = useState("");

  // Confirmação de exclusão
  const [deletandoId, setDeletandoId] = useState(null);
  const [confirmandoDelete, setConfirmandoDelete] = useState(false);

  const buscarRegistros = useCallback(async () => {
    setLoading(true);
    setErro("");
    try {
      const res = await fetch(API_URL, { credentials: "include" });
      if (!res.ok) throw new Error("Erro ao buscar registros.");
      const data = await res.json();
      setRegistros(data);
    } catch (e) {
      setErro("Não foi possível carregar os registros.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarRegistros();
  }, [buscarRegistros]);

  function abrirCriar() {
    setEditando(null);
    setWeight("");
    setHeight("");
    setErroForm("");
    setModalAberto(true);
  }

  function abrirEditar(registro) {
    setEditando(registro);
    setWeight(String(registro.weight));
    setHeight(String(registro.height));
    setErroForm("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditando(null);
    setErroForm("");
  }

  async function salvar() {
    setErroForm("");
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!weight || !height) {
      setErroForm("Preencha peso e altura.");
      return;
    }
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setErroForm("Peso e altura devem ser números maiores que zero.");
      return;
    }

    setSalvando(true);
    try {
      const url = editando ? `${API_URL}/${editando.id}` : API_URL;
      const method = editando ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: w, height: h }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar.");
      }

      await buscarRegistros();
      fecharModal();
    } catch (e) {
      setErroForm(e.message);
    } finally {
      setSalvando(false);
    }
  }

  function confirmarDelete(id) {
    setDeletandoId(id);
    setConfirmandoDelete(true);
  }

  async function deletar() {
    try {
      const res = await fetch(`${API_URL}/${deletandoId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao deletar.");
      await buscarRegistros();
    } catch (e) {
      setErro("Não foi possível deletar o registro.");
    } finally {
      setConfirmandoDelete(false);
      setDeletandoId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 pt-0">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScaleIcon className="size-5 text-muted-foreground" />
          <div>
            <h1 className="text-xl font-semibold">Registros de IMC</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seu histórico de peso e altura
            </p>
          </div>
        </div>
        <Button onClick={abrirCriar} className="gap-2">
          <PlusIcon className="size-4" />
          Novo Registro
        </Button>
      </div>

      {/* Erro geral */}
      {erro && (
        <p className="text-sm text-destructive text-center">{erro}</p>
      )}

      {/* Tabela */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Peso (kg)</TableHead>
              <TableHead>Altura (m)</TableHead>
              <TableHead>IMC</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : registros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                  Nenhum registro ainda. Clique em "Novo Registro" para começar.
                </TableCell>
              </TableRow>
            ) : (
              registros.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(r.createdAt)}
                  </TableCell>
                  <TableCell>{r.weight} kg</TableCell>
                  <TableCell>{r.height} m</TableCell>
                  <TableCell className="font-semibold">{r.imc}</TableCell>
                  <TableCell>
                    <Badge variant={CATEGORY_COLORS[r.category] ?? "outline"}>
                      {r.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => abrirEditar(r)}
                      >
                        <PencilIcon className="size-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => confirmarDelete(r.id)}
                      >
                        <Trash2Icon className="size-4" />
                        <span className="sr-only">Deletar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal criar/editar */}
      <Dialog open={modalAberto} onOpenChange={fecharModal}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar Registro" : "Novo Registro de IMC"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            {erroForm && (
              <p className="text-sm text-destructive">{erroForm}</p>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="weight" className="text-sm font-medium">
                Peso (kg)
              </label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="1"
                placeholder="Ex: 70.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="height" className="text-sm font-medium">
                Altura (m)
              </label>
              <Input
                id="height"
                type="number"
                step="0.01"
                min="0.5"
                placeholder="Ex: 1.75"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Preview do IMC */}
            {weight && height && parseFloat(weight) > 0 && parseFloat(height) > 0 && (
              <div className="rounded-md bg-muted p-3 text-sm text-center">
                IMC estimado:{" "}
                <span className="font-semibold">
                  {(parseFloat(weight) / (parseFloat(height) ** 2)).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={fecharModal} disabled={salvando}>
              Cancelar
            </Button>
            <Button onClick={salvar} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmação de exclusão */}
      <AlertDialog open={confirmandoDelete} onOpenChange={setConfirmandoDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. O registro será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={deletar}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}